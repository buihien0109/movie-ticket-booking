import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCheckRegisterTokenQuery } from '../../app/services/auth.api';
import Error from '../../components/error/Error';
import { EyeIcon, EyeOffIcon, IconFail, IconSuccess } from '../../components/icon/Icon';
import Loading from '../../components/loading/Loading';

// http://127.0.0.1:5174/xac-thuc-tai-khoan?token=6814410a-3f65-4dba-822b-15ca4d51c007
function ConfirmRegistration() {
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get('token');
    const {
        data,
        isLoading,
        isError,
        error
    } = useCheckRegisterTokenQuery(token);

    if (isLoading) return <Loading />
    if (isError) return <Error error={error} />

    return (
        <div className="bg-gray-50">
            <div className="max-w-6xl mx-auto py-7">
                <div className="pb-7">
                    <h1 className="flex items-center justify-start text-2xl font-semibold text-gray-900">
                        {data.success ? <IconSuccess extraClass={"!m-0 !w-10 !h-10"} /> : <IconFail extraClass={"!m-0 !w-10 !h-10"} />}
                        <span className="ms-2">{data.message}</span>
                    </h1>

                    {data.success && (
                        <p className='mt-5 text-sm text-gray-500'>Chào mừng bạn đến với trang web của chúng tôi</p>
                    )}
                </div>

            </div>
        </div>
    )
}

export default ConfirmRegistration