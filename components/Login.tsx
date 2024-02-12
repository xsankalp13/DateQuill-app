'use client'
import React, { useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';



type FormDataProps = {
    email: string,
    password: string
}

type valueProp = {
    email: string,
    password: string,
    remember: boolean
}


interface LoginProps {
    setType: React.Dispatch<React.SetStateAction<"login" | "signup">>;
  }



const Login: React.FC<LoginProps> = ({setType}) => {
    

    const supabase = createClientComponentClient();
    const [data, setData] =  useState<FormDataProps | null>(null)

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

      const handleSignIn = async () => {
        const res = await supabase.auth.signInWithPassword({
          email: data?.email!,
          password: data?.password!,
        })
        router.push('/payment');
      }
    //   const handleLogout = async () => {
    //     await supabase.auth.signOut();
    //     router.refresh();
    //     setUser(null);
    //   }


  const onFinish = (values: valueProp) => {
    setData({
        email: values.email,
        password: values.password
    })
    handleSignIn();
  };
  return (
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" type='email' />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Link className="login-form-forgot" href="">
            Forgot password
          </Link>
        </Form.Item>

        <Form.Item>
          <Button type='default' htmlType="submit" className="w-full">
            Log in
          </Button>
        </Form.Item>
        Or <Button type='text' htmlType='button' onClick={() => setType('signup')}>register now!</Button>
        <Button type='default' htmlType='button' onClick={handleGoogleOauth} >Sign In with Google</Button>
      </Form>
  )
}

export default Login