'use client';
import React, { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { useRouter } from "@/libs/i18nNavigation";
import { useTranslations } from 'next-intl';
import './index.css';
import { loginApi } from '@/services/user';
import notifyHook from '@/hooks/notify';

const { Title } = Typography;

const SignIn: React.FC = () => {
  const t = useTranslations('signIn');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { notify } = notifyHook();

   // Function to delete a specific cookie
  const deleteCookie = (name: string) => {
    document.cookie = name + '=; Path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };

  // Delete a specific cookie when component mounts
  React.useEffect(() => {
    deleteCookie('access_token');
  }, []);

  const onFinish = async (values: any) => {
    setLoading(true);
    const data = await loginApi(values);
    setLoading(false);
    if (data?.responseOk) {
      notify('success', t('successMessage'));
      router.push(`/dashboard`);
    } else {
      notify('error', t('errorMessage'));
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="sign-in-container">
      <Title level={2} className="title-custom">{t('title')}</Title>
      <Form
        name="login"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label={t('emailLabel')}
          name="email"
          rules={[
            { required: true, message: t('emailRequired') },
            { type: 'email', message: t('emailInvalid') }
          ]}
        >
          <Input placeholder={t('emailPlaceholder')} />
        </Form.Item>

        <Form.Item
          label={t('passwordLabel')}
          name="password"
          rules={[{ required: true, message: t('passwordRequired') }]}
        >
          <Input.Password placeholder={t('passwordPlaceholder')} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            {t('signInButton')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
