import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useRegisterAccountMutation } from '../../../app/services/auth.api';
import { EyeIcon, EyeOffIcon } from '../../icon/Icon';
import ModalBase from '../base/ModalBase';

const schema = yup.object({
    name: yup.string()
        .required('Họ tên không được để trống'),
    email: yup.string()
        .email('Email không đúng định dạng').required('Email không được để trống'),
    phone: yup.string()
        .required('Số điện thoại không được để trống')
        .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'Số điện thoại không đúng định dạng'),
    password: yup.string()
        .required('Mật khẩu không được để trống'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Mật khẩu xác nhận không trùng khớp')
        .required('Xác nhận mật khẩu không được để trống'),
}).required();

function RegistrationModal({ open, handleClose, handleLogin }) {
    const [registerAccount, { isLoading }] = useRegisterAccountMutation();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false
    });

    const togglePasswordVisibility = (field) => {
        setShowPassword({ ...showPassword, [field]: !showPassword[field] });
    };

    const onSubmit = data => {
        registerAccount(data)
            .unwrap()
            .then((res) => {
                toast.success('Đăng ký thành công. Vui lòng kiểm tra email để xác nhận tài khoản');
                handleClose();
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.data.message)
            });
    };

    return (
        <ModalBase isOpen={open} onClose={handleClose} size="sm" style={{ width: "550px" }} zIndex={1080}>
            <div className="flex h-full flex-col overflow-auto rounded-md p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Đăng ký
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Họ tên</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                {...register('name')}
                                placeholder="Enter name..."
                                className="border border-gray-300 text-gray-800 sm:text-sm rounded-lg focus:border-pink-600 block w-full p-2.5"
                            />
                            <p className="text-red-500 text-xs mt-1">{errors.name?.message}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    {...register('email')}
                                    placeholder="Enter email..."
                                    className="border border-gray-300 text-gray-800 sm:text-sm rounded-lg focus:border-pink-600 block w-full p-2.5"
                                />
                                <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
                            </div>
                            <div>
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Số điện thoại</label>
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    {...register('phone')}
                                    placeholder="Enter phone..."
                                    className="border border-gray-300 text-gray-800 sm:text-sm rounded-lg focus:border-pink-600 block w-full p-2.5"
                                />
                                <p className="text-red-500 text-xs mt-1">{errors.phone?.message}</p>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Mật khẩu</label>
                            <div className="relative">
                                <input
                                    type={showPassword.password ? 'text' : 'password'}
                                    name="password"
                                    id="password"
                                    {...register('password')}
                                    placeholder="Enter password..."
                                    className="border border-gray-300 text-gray-800 sm:text-sm rounded-lg focus:border-pink-600 block w-full p-2.5 pe-11"
                                />
                                <button
                                    onClick={() => togglePasswordVisibility('password')}
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                    title="Show password"
                                >
                                    {showPassword.password ? <EyeOffIcon /> : <EyeIcon />}
                                </button>
                            </div>
                            <p className="text-red-500 text-xs mt-1">{errors.password?.message}</p>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">Xác nhận mật khẩu</label>
                            <div className="relative">
                                <input
                                    type={showPassword.confirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    {...register('confirmPassword')}
                                    placeholder="Enter confirm password..."
                                    className="border border-gray-300 text-gray-800 sm:text-sm rounded-lg focus:border-pink-600 block w-full p-2.5 pe-11"
                                />
                                <button
                                    onClick={() => togglePasswordVisibility('confirmPassword')}
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                    title="Show password"
                                >
                                    {showPassword.confirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                                </button>
                            </div>
                            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword?.message}</p>
                        </div>
                        <button
                            type="submit"
                            className="flex items-center justify-center w-full text-white bg-pink-600 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
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
                            Đăng ký
                        </button>
                        <p className="text-sm font-light text-gray-800">
                            Bạn đã có tài khoản? <span onClick={handleLogin} className="font-medium text-primary-600 hover:underline cursor-pointer">Đăng nhập?</span>
                        </p>
                    </form>
                </div>
            </div>
        </ModalBase>
    );
}

export default RegistrationModal;
