import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useUpdateAvatarMutation, useUpdateProfileMutation } from '../../../app/services/user.api';
import { updateAuth } from '../../../app/slices/auth.slice';

const schema = yup.object({
    name: yup.string()
        .required('Họ tên không được để trống'),
    phone: yup.string()
        .required('Số điện thoại không được để trống')
        .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'Số điện thoại không đúng định dạng'),
}).required();

function Profile() {
    const dispatch = useDispatch();
    const { auth } = useSelector(state => state.auth);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: auth.name || '',
            phone: auth.phone || ''
        }
    });
    const [updateProfile, { isLoading }] = useUpdateProfileMutation();
    const [updateAvatar] = useUpdateAvatarMutation();

    const handleUpdateProfile = data => {
        updateProfile(data)
            .unwrap()
            .then((res) => {
                toast.success("Cập nhật thông tin thành công");
                dispatch(updateAuth(data))
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.data.message)
            });
    }

    const handleUploadAvatar = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        updateAvatar(formData)
            .unwrap()
            .then((res) => {
                toast.success("Cập nhật ảnh đại diện thành công");
                dispatch(updateAuth({ avatar: res.url }))
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.data.message)
            });
    }

    return (
        <>
            <h2 className="text-2xl font-bold text-gray-800 mb-7">Thông tin cá nhân</h2>
            <div
                className="relative w-full rounded-sm bg-cover bg-center bg-no-repeat flex items-center py-4"
                style={{ backgroundImage: "url('https://homepage.momocdn.net/img/momo-upload-api-230912110927-638301137672516955.jpeg')" }}
            >
                <div
                    className="mx-auto flex justify-center items-center w-32 h-32 rounded-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${auth.avatar})` }}
                >
                    <div className="bg-white/90 rounded-full w-6 h-6 text-center ml-32 mt-0">
                        <input
                            onChange={handleUploadAvatar}
                            type="file"
                            name="profile"
                            id="upload_profile"
                            hidden
                            required
                        />
                        <label htmlFor="upload_profile" className="cursor-pointer">
                            <svg data-slot="icon" className="w-6 h-5 text-pink-600" fill="none"
                                strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z">
                                </path>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z">
                                </path>
                            </svg>
                        </label>
                    </div>
                </div>
                <div className="absolute right-0 bottom-0">
                    <input
                        onChange={handleUploadAvatar}
                        type="file"
                        name="profile"
                        id="upload_cover"
                        hidden
                        required
                    />
                    <div className="bg-white flex items-center gap-1 rounded-tl-md px-2 text-center text-sm font-normal">
                        <label htmlFor="upload_cover" className="inline-flex items-center gap-1 cursor-pointer">Avatar
                            <svg data-slot="icon" className="w-6 h-5 text-pink-600" fill="none" strokeWidth="1.5"
                                stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z">
                                </path>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z">
                                </path>
                            </svg>
                        </label>
                    </div>
                </div>
            </div>
            <form className="mt-5" onSubmit={handleSubmit(handleUpdateProfile)}>
                <div className="mb-5">
                    <label htmlFor="name" className="mb-3 block text-base font-medium text-gray-800">
                        Họ tên
                    </label>
                    <input
                        {...register('name')}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter name..."
                        className="w-full rounded-md border border-gray-300 bg-white py-3 px-3 text-sm text-gray-900 outline-none focus:ring-primary-600 focus:border-blue-600"
                    />
                    <p className="text-red-500 text-xs mt-1">{errors.name?.message}</p>
                </div>
                <div className="mb-5">
                    <label htmlFor="phone" className="mb-3 block text-base font-medium text-gray-800">
                        Số điện thoại
                    </label>
                    <input
                        {...register('phone')}
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="Enter phone..."
                        className="w-full rounded-md border border-gray-300 bg-white py-3 px-3 text-sm text-gray-900 outline-none focus:ring-primary-600 focus:border-blue-600"
                    />
                    <p className="text-red-500 text-xs mt-1">{errors.phone?.message}</p>
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="mb-3 block text-base font-medium text-gray-800">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter email..."
                        className="w-full rounded-md border border-gray-300 bg-gray-100 py-3 px-3 text-sm text-gray-900 outline-none focus:ring-primary-600 focus:border-blue-600"
                        disabled={true}
                        value={auth.email}
                    />
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

export default Profile