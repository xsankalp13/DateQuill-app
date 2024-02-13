'use client'
import React, { FC, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

type FormDataProps = {
    email: string,
    password: string
}



interface LoginProps {
    setType: React.Dispatch<React.SetStateAction<"login" | "signup">>;
  }

type valueProp = {
    email: string,
    password: string,
    remember: boolean
}


import {
  Button,
  Checkbox,
  Form,
  Input,
} from 'antd';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};


const SignUp:FC<LoginProps> = ({setType}) => {
  const [form] = Form.useForm();

  const supabase = createClientComponentClient();
  const [formdata, setData] =  useState<FormDataProps | null>(null)

  const router = useRouter()

  const handleGoogleOauth = async () => {
    const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supaAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const supa = createBrowserClient(supaUrl, supaAnonKey)
    try {
      const { data, error } = await supa.auth.signInWithOAuth({
        provider: "google",
        options:{
          redirectTo: `${location.origin}/auth/callback`
        }
      });
      if (error) {
        // Handle error gracefully, e.g., show an error message to the user
        console.error('Error signing in with Google:', error.message || error);
      } else {
        console.log('Google OAuth successful:', data);
      }
    } catch (error) {
        console.error('Unexpected error during Google OAuth:', error);
    }
  };


  const handleSignUp = async () => {
    const {data,error} =  await supabase.auth.signUp({
      email: formdata?.email!,
      password: formdata?.password!,
      options:{
        emailRedirectTo : `${location.origin}/auth/callback`
      }
    })
    router.push('/Payments');
  }

  const onFinish = (values: valueProp) => {
    setData({
        email: values.email,
        password:values.password
    });
    handleSignUp();
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
      className='w-[44%]'
    >
      <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon p-3" />} placeholder="Username" type='email' />

      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
          },
        ]}
        hasFeedback
      >
        <Input
            prefix={<LockOutlined className="site-form-item-icon p-3" />}
            type="password"
            placeholder="Password"
        />
      </Form.Item>

      <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input
            prefix={<LockOutlined className="site-form-item-icon p-3" />}
            type="password"
            placeholder="Password"
        />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
        
      >
        <Checkbox className=''>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type='default' htmlType="submit" className='w-full bg-[#ff4f67] border-none text-background hover:bg-[#ff4f67e4]'>
          Register
        </Button>
        Or <Button type='link' htmlType='button' onClick={() => setType('login')}>Log In!</Button>
        <Button type='text' htmlType='button' onClick={handleGoogleOauth} className='w-full bg-[#ff4f67] border-none text-background hover:bg-[#ff4f67e4] mt-5' >Sign In with Google</Button>
      </Form.Item>


    </Form>
  );
};

export default SignUp;