import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useForgotPasswordMutation } from '../../../app/services/auth.api';
import ModalBase from '../base/ModalBase';

const schema = yup.object({
    email: yup.string()
        .email('Email không đúng định dạng')
        .required('Email không được để trống'),
}).required();

function ForgotPasswordModal({ open, handleClose }) {
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = data => {
        forgotPassword(data)
            .unwrap()
            .then((res) => {
                toast.success("Đã gửi yêu cầu đặt lại mật khẩu. Vui lòng kiểm tra email của bạn");
                handleClose();
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.data.message)
            });
    };

    return (
        <ModalBase isOpen={open} onClose={handleClose} size="sm" style={{ width: "500px" }} zIndex={1080}>
            <div className="flex h-full flex-col overflow-auto rounded-md p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Quên mật khẩu
                    </h1>
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
                            Gửi yêu cầu
                        </button>
                    </form>
                </div>
            </div>
        </ModalBase>
    );
}

export default ForgotPasswordModal;
