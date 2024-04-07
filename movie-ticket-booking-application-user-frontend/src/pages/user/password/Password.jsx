import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useChangePasswordMutation } from '../../../app/services/user.api';

const EyeIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-500" fill="currentColor" width="20" height="20" viewBox="0 0 24 24">
            <path d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 5c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zm0-2c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z" />
        </svg>
    )
}

const EyeOffIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-500" fill="currentColor" width="20" height="20" viewBox="0 0 24 24">
            <path d="M19.604 2.562l-3.346 3.137c-1.27-.428-2.686-.699-4.243-.699-7.569 0-12.015 6.551-12.015 6.551s1.928 2.951 5.146 5.138l-2.911 2.909 1.414 1.414 17.37-17.035-1.415-1.415zm-6.016 5.779c-3.288-1.453-6.681 1.908-5.265 5.206l-1.726 1.707c-1.814-1.16-3.225-2.65-4.06-3.66 1.493-1.648 4.817-4.594 9.478-4.594.927 0 1.796.119 2.61.315l-1.037 1.026zm-2.883 7.431l5.09-4.993c1.017 3.111-2.003 6.067-5.09 4.993zm13.295-4.221s-4.252 7.449-11.985 7.449c-1.379 0-2.662-.291-3.851-.737l1.614-1.583c.715.193 1.458.32 2.237.32 4.791 0 8.104-3.527 9.504-5.364-.729-.822-1.956-1.99-3.587-2.952l1.489-1.46c2.982 1.9 4.579 4.327 4.579 4.327z" />
        </svg>
    )
}

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