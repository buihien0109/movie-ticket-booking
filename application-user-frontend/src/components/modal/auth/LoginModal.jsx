import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useLoginMutation } from '../../../app/services/auth.api';
import ModalBase from '../base/ModalBase';
import { EyeIcon, EyeOffIcon } from '../../icon/Icon';

const schema = yup.object({
    email: yup.string()
        .email('Email không đúng định dạng')
        .required('Email không được để trống'),
    password: yup.string().required('Mật khẩu không được để trống'),
}).required();

function LoginModal({ open, handleClose, handleForgotPassword, handleRegister }) {
    const [login, { isLoading }] = useLoginMutation();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [showPassword, setShowPassword] = useState({
        password: false,
    });

    const togglePasswordVisibility = (field) => {
        setShowPassword({ ...showPassword, [field]: !showPassword[field] });
    };

    const onSubmit = data => {
        login(data).unwrap()
            .then(() => {
                toast.success('Đăng nhập thành công');
                handleClose();
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.data.message)
            })


    };

    return (
        <ModalBase isOpen={open} onClose={handleClose} size="sm" style={{ width: "500px" }} zIndex={1080}>
            <div className="flex h-full flex-col overflow-auto rounded-md p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Đăng nhập
                    </h1>

                    <button
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white p-2.5 text-sm font-medium text-gray-800 outline-none hover:bg-gray-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 92" fill="none"
                            className="h-[18px] w-[18px]">
                            <path
                                d="M90 47.1c0-3.1-.3-6.3-.8-9.3H45.9v17.7h24.8c-1 5.7-4.3 10.7-9.2 13.9l14.8 11.5C85 72.8 90 61 90 47.1z"
                                fill="#4280ef"></path>
                            <path
                                d="M45.9 91.9c12.4 0 22.8-4.1 30.4-11.1L61.5 69.4c-4.1 2.8-9.4 4.4-15.6 4.4-12 0-22.1-8.1-25.8-18.9L4.9 66.6c7.8 15.5 23.6 25.3 41 25.3z"
                                fill="#34a353"></path>
                            <path
                                d="M20.1 54.8c-1.9-5.7-1.9-11.9 0-17.6L4.9 25.4c-6.5 13-6.5 28.3 0 41.2l15.2-11.8z"
                                fill="#f6b704"></path>
                            <path
                                d="M45.9 18.3c6.5-.1 12.9 2.4 17.6 6.9L76.6 12C68.3 4.2 57.3 0 45.9.1c-17.4 0-33.2 9.8-41 25.3l15.2 11.8c3.7-10.9 13.8-18.9 25.8-18.9z"
                                fill="#e54335"></path>
                        </svg>Đăng nhập với Google
                    </button>

                    <div className="flex w-full items-center gap-2 py-4 text-sm text-slate-600">
                        <div className="h-px w-full bg-slate-200"></div>HOẶC
                        <div className="h-px w-full bg-slate-200"></div>
                    </div>

                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                {...register('email')}
                                placeholder="Enter email..."
                                className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            />
                            <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
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
                                    className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pe-11"
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
                        <div className="flex items-center justify-end">
                            <span onClick={handleForgotPassword} className="text-sm font-medium text-gray-800 hover:underline cursor-pointer">Quên mật khẩu?</span>
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
                            Đăng nhập
                        </button>




                        <p className="text-sm font-light text-gray-800">
                            Bạn chưa có tài khoản? <span onClick={handleRegister} className="font-medium text-primary-600 hover:underline cursor-pointer">Đăng ký?</span>
                        </p>
                    </form>
                </div>
            </div>
        </ModalBase>
    );
}

export default LoginModal;
