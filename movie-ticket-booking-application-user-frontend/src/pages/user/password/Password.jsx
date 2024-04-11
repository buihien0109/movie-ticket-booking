import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useChangePasswordMutation } from '../../../app/services/user.api';
import { EyeIcon, EyeOffIcon } from '../../../components/icon/Icon';

const schema = yup.object({
    oldPassword: yup.string()
        .required('Mật khẩu cũ không được để trống'),
    newPassword: yup.string()
        .required('Mật khẩu mới không được để trống'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('newPassword'), null], 'Mật khẩu xác nhận không trùng khớp')
        .required('Xác nhận mật khẩu không được để trống'),
}).required();

function Password() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [changePassword, { isLoading }] = useChangePasswordMutation();
    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false
    });

    const togglePasswordVisibility = (field) => {
        setShowPassword({ ...showPassword, [field]: !showPassword[field] });
    };

    const onSubmit = data => {
        changePassword(data)
            .unwrap()
            .then((res) => {
                toast.success('Đổi mật khẩu thành công');
                reset();
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.data.message)
            });
    }
    return (
        <>
            <h2 className="text-2xl font-bold text-gray-800 mb-7">Đổi mật khẩu</h2>
            <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                    <label htmlFor="oldPassword" className="mb-3 block text-base font-medium text-gray-800">
                        Mật khẩu cũ
                    </label>
                    <div className="relative">
                        <input
                            {...register('oldPassword')}
                            type={showPassword.oldPassword ? 'text' : 'password'}
                            name="oldPassword"
                            id="oldPassword"
                            placeholder="Enter old password..."
                            className="w-full rounded-md border border-gray-300 bg-white py-3 ps-3 pe-11 text-sm text-gray-900 outline-none focus:ring-primary-600 focus:border-blue-600"
                        />
                        <button
                            onClick={() => togglePasswordVisibility('oldPassword')}
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            title="Show password"
                        >
                            {showPassword.oldPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                    </div>
                    <p className="text-red-500 text-xs mt-1">{errors.oldPassword?.message}</p>
                </div>
                <div className="mb-5">
                    <label htmlFor="newPassword" className="mb-3 block text-base font-medium text-gray-800">
                        Mật khẩu mới
                    </label>
                    <div className="relative">
                        <input
                            {...register('newPassword')}
                            type={showPassword.newPassword ? 'text' : 'password'}
                            name="newPassword"
                            id="newPassword"
                            placeholder="Enter new password..."
                            className="w-full rounded-md border border-gray-300 bg-white py-3 ps-3 pe-11 text-sm text-gray-900 outline-none focus:ring-primary-600 focus:border-blue-600"
                        />
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
                <div className="mb-5">
                    <label htmlFor="confirmPassword" className="mb-3 block text-base font-medium text-gray-800">
                        Xác nhận mật khẩu
                    </label>
                    <div className="relative">
                        <input
                            {...register('confirmPassword')}
                            type={showPassword.confirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Enter confirm password..."
                            className="w-full rounded-md border border-gray-300 bg-white py-3 ps-3 pe-11 text-sm text-gray-900 outline-none focus:ring-primary-600 focus:border-blue-600"
                        />
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
                <div className="mb-5">
                    <button type="submit"
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
                        Lưu thông tin
                    </button>
                </div>
            </form>
        </>
    );
}

export default Password