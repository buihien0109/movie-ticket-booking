package com.example.movie.ticket.booking.application.entity;

import com.example.movie.ticket.booking.application.model.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "orders")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Order {
    @Id
    Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @ManyToOne
    @JoinColumn(name = "show_id")
    Showtime showtime;

    @Enumerated(EnumType.STRING)
    OrderStatus status;

    Integer discount;

    @Transient
    Integer tempPrice;

    @Transient
    Integer discountPrice;

    @Transient
    Integer totalPrice;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    @Fetch(FetchMode.SUBSELECT)
    List<OrderTicketItem> ticketItems = new ArrayList<>();

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    @Fetch(FetchMode.SUBSELECT)
    List<OrderServiceItem> serviceItems = new ArrayList<>();

    String qrCodePath;

    LocalDateTime createdAt;
    LocalDateTime updatedAt;

    public int getTempPrice() {
        Integer ticketPrice = ticketItems.stream()
                .map(OrderTicketItem::getPrice)
                .reduce(0, Integer::sum);
        Integer servicePrice = serviceItems.stream()
                .map(serviceItems -> serviceItems.getPrice() * serviceItems.getQuantity())
                .reduce(0, Integer::sum);
        return ticketPrice + servicePrice;
    }

    public int getDiscountPrice() {
        if (discount == null) {
            return 0;
        }
        return getTempPrice() * discount / 100;
    }

    public int getTotalPrice() {
        return getTempPrice() - getDiscountPrice();
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public void addTicketItem(OrderTicketItem orderTicketItem) {
        orderTicketItem.setOrder(this);
        ticketItems.add(orderTicketItem);
    }

    public void addServiceItem(OrderServiceItem orderServiceItem) {
        orderServiceItem.setOrder(this);
        serviceItems.add(orderServiceItem);
    }
}
