package com.example.movie.ticket.booking.application.service;


import com.example.movie.ticket.booking.application.config.payment.vnpay.VNPayConfig;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

// Thông tin chi tiết: https://sandbox.vnpayment.vn/apis/docs/thanh-toan-pay/pay.html
// Xem các thông tin giao dịch: https://sandbox.vnpayment.vn/merchantv2/Home/Dashboard.htm
@Slf4j
@Service
@RequiredArgsConstructor
public class VNPayService {

    public String createOrder(int total, String orderInfo, String urlReturn) {
        Map<String, String> vnpParams = new HashMap<>();
        initializeOrderParams(vnpParams, total, orderInfo, urlReturn);
        return buildPaymentUrl(vnpParams);
    }

    private void initializeOrderParams(Map<String, String> params, int total, String orderInfo, String urlReturn) {
        params.put("vnp_Version", "2.1.0");
        params.put("vnp_Command", "pay");
        params.put("vnp_TmnCode", VNPayConfig.vnp_TmnCode);
        params.put("vnp_Amount", String.valueOf(total * 100));
        params.put("vnp_CurrCode", "VND");
        params.put("vnp_TxnRef", VNPayConfig.getRandomNumber(8));
        params.put("vnp_OrderInfo", orderInfo);
        params.put("vnp_OrderType", "250000");
        params.put("vnp_Locale", "vn");
        params.put("vnp_ReturnUrl", urlReturn + VNPayConfig.vnp_Returnurl);
        params.put("vnp_IpAddr", "127.0.0.1");

        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        params.put("vnp_CreateDate", formatter.format(Calendar.getInstance().getTime()));
        Calendar expireCalendar = Calendar.getInstance();
        expireCalendar.add(Calendar.MINUTE, 10);
        params.put("vnp_ExpireDate", formatter.format(expireCalendar.getTime()));
    }

    private String buildPaymentUrl(Map<String, String> params) {
        List<String> fieldNames = new ArrayList<>(params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();

        for (int i = 0; i < fieldNames.size(); i++) {
            String fieldName = fieldNames.get(i);
            String fieldValue = params.get(fieldName);

            if (fieldValue != null && !fieldValue.isEmpty()) {
                appendQueryParameters(hashData, query, fieldName, fieldValue, i > 0);
            }
        }

        String queryUrl = query.toString();
        String vnpSecureHash = VNPayConfig.hmacSHA512(VNPayConfig.vnp_HashSecret, hashData.toString());
        return VNPayConfig.vnp_PayUrl + "?" + queryUrl + "&vnp_SecureHash=" + vnpSecureHash;
    }

    private void appendQueryParameters(StringBuilder hashData, StringBuilder query, String fieldName, String fieldValue, boolean appendAmpersand) {
        if (appendAmpersand) {
            hashData.append('&');
            query.append('&');
        }

        String encodedFieldName = URLEncoder.encode(fieldName, StandardCharsets.UTF_8);
        String encodedFieldValue = URLEncoder.encode(fieldValue, StandardCharsets.UTF_8);

        hashData.append(encodedFieldName).append('=').append(encodedFieldValue);
        query.append(encodedFieldName).append('=').append(encodedFieldValue);
    }

    public int orderReturn(HttpServletRequest request) {
        Map<String, String> fields = new HashMap<>();
        Enumeration<String> parameterNames = request.getParameterNames();

        while (parameterNames.hasMoreElements()) {
            String fieldName = parameterNames.nextElement();
            String fieldValue = request.getParameter(fieldName);
            if (fieldValue != null && !fieldValue.isEmpty()) {
                fields.put(URLEncoder.encode(fieldName, StandardCharsets.UTF_8), URLEncoder.encode(fieldValue, StandardCharsets.UTF_8));
            }
        }

        String vnpSecureHash = request.getParameter("vnp_SecureHash");
        fields.remove("vnp_SecureHashType");
        fields.remove("vnp_SecureHash");

        String signValue = VNPayConfig.hashAllFields(fields);
        if (signValue.equals(vnpSecureHash)) {
            return "00".equals(request.getParameter("vnp_TransactionStatus")) ? 1 : 0;
        } else {
            return -1;
        }
    }
}

