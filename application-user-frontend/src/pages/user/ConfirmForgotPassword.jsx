import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useChangePasswordMutation, useCheckForgotPasswordTokenQuery } from '../../app/services/auth.api';
import Error from '../../components/error/Error';
import { EyeIcon, EyeOffIcon, IconFail, IconSuccess } from '../../components/icon/Icon';
import Loading from '../../components/loading/Loading';

const schema = yup.object({
    newPassword: yup.string()
        .required('Mật khẩu không được để trống'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('newPassword'), null], 'Mật khẩu xác nhận không trùng khớp')
        .required('Xác nhận mật khẩu không được để trống'),
}).required();

function ConfirmForgotPassword() {
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();
    const {
        data,
        isLoading: isLoadingCheckForgotPasswordToken,
        isError: isErrorCheckForgotPasswordToken,
        error
    } = useCheckForgotPasswordTokenQuery(token);
    const [changePassword, { isLoading }] = useChangePasswordMutation();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [showPassword, setShowPassword] = useState({
        newPassword: false,
        confirmPassword: false
    });

    const togglePasswordVisibility = (field) => {
        setShowPassword({ ...showPassword, [field]: !showPassword[field] });
    };

    const onSubmit = data => {
        changePassword({ ...data, token })
            .unwrap()
            .then((res) => {
                toast.success('Đổi mật khẩu thành công. Vui lòng đăng nhập');
                setTimeout(() => {
                    navigate("/")
                }, 1500);
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.data.message)
            });
    };

    if (isLoadingCheckForgotPasswordToken) return <Loading />
    if (isErrorCheckForgotPasswordToken) return <Error error={error} />

    return (
        <div className="bg-gray-50">
            <div className="max-w-6xl mx-auto py-7">
                <div className="pb-7">
                    <h1 className="flex items-center justify-start text-2xl font-semibold text-gray-900">
                        {data.success ? <IconSuccess extraClass={"!m-0 !w-10 !h-10"} /> : <IconFail extraClass={"!m-0 !w-10 !h-10"} />}
                        <span className="ms-2">{data.message}</span>
                    </h1>
                </div>

                {data.success && (
                    <div className="grid grid-cols-2">
                        <div className="col-span-1">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 bg-white">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                    Đổi mật khẩu
                                </h1>
                                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                    <div>
                                        <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900">Mật khẩu</label>
                                        <div className="relative">
                                            <input
                                                type={showPassword.newPassword ? 'text' : 'password'}
                                                name="newPassword"
                                                id="newPassword"
                                                {...register('newPassword')}
                                                className="border border-gray-300 text-gray-800 sm:text-sm rounded-lg focus:border-pink-600 block w-full p-2.5" />
                                            <button
                                                onClick={() => togglePasswordVisibility('newPassword')}
                                                type="button"
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                                title="Show password"
                                            >
                                                {showPassword.newPassword ? <EyeOffIcon /> : <EyeIcon />}
                                            </button>

                                        </div>
                                        <p className="text-red-500 text-xs mt-1">{errors.newPassword?.message}</p>
                                    </div>
                                    <div>
                                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">Xác nhận mật khẩu</label>
                                        <div className="relative">
                                            <input
                                                type={showPassword.confirmPassword ? 'text' : 'password'}
                                                name="confirmPassword"
                                                id="confirmPassword"
                                                {...register('confirmPassword')}
                                                className="border border-gray-300 text-gray-800 sm:text-sm rounded-lg focus:border-pink-600 block w-full p-2.5" />
                                            <button
                                                onClick={() => togglePasswordVisibility('confirmPassword')}
                                                type="button"
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2" title="Show password"
                                            >
                                                {showPassword.confirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                                            </button>
                                        </div>

                                        <p className="text-red-500 text-xs mt-1">{errors.confirmPassword?.message}</p>
                                    </div>
                                    <button
                                        type="submit"
                                        className="flex items-center justify-center text-white bg-pink-600 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <span className="animate-spin inline-block mr-2">
                                                <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            </span>
                                        ) : null}
                                        Xác nhận
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ConfirmForgotPassword