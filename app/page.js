'use client';

import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

import LoadingModal from '@/components/modal/loadingModal';
import LoginForm from '../components/login/LoginForm';
import AlertModal from '../components/modal/alertModal';

const LoginPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [formData, setFormData] = useState({
    memberLoginId: '',
    memberPassword: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  useEffect(() => {
    if (session) {
      router.push('/information');
    }
  }, [session, router]);

  useEffect(() => {
    setIsFormValid(
      formData.memberLoginId.length > 0 && formData.memberPassword.length > 0
    );
  }, [formData]);



  const handleLogin = async (e) => {
    e.preventDefault();
    let isAuthed = true;
    setIsLoading(true);

    try {
      const response = await signIn('credentials', {
        memberLoginId: formData.memberLoginId,
        memberPassword: formData.memberPassword,
        redirect: false,
      });
      if (response.error) {
        setSuccess(false);
        setTimeout(() => {
          setShowAlertModal(true);
          isAuthed = false;
        },0)
      } else {
        setSuccess(true);

      }
    } catch (err) {
      isAuthed = false;
      setShowAlertModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen justify-center bg-cover" style={{backgroundImage: "url(/images/login-background.jpg)"}}>
      <div className="w-full shrink-0 px-6 pt-12 pb-20">
        <div className="mx-auto">
          <h1 className="text-3xl font-bold color1 mb-3 text-center">
            커스터마이징 카드 관리자 페이지
          </h1>
          <p className="text-base text-gray-900 text-center">
            서비스 이용을 위해 로그인해주세요.
          </p>
        </div>
      </div>

      <div className="shrink-0">
          <div className="max-w-lg mx-auto px-5">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-center mb-8">로그인</h2>
              <LoginForm
                formData={formData}
                handleInputChange={handleInputChange}
                isFormValid={isFormValid}
                onSubmit={handleLogin}
              />
            </div>
          </div>
      </div>
      <LoadingModal message={"로그인 중입니다"} isOpen={isLoading} />
    </div>
  );
};

export default LoginPage;