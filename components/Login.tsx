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
            className="login-form  w-[44%]"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            {...formItemLayout}

        >
            <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
            >
            <Input prefix={<UserOutlined className="site-form-item-icon p-3" />} placeholder="Username" type='email' />
            </Form.Item>
            <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
            >
            <Input
                prefix={<LockOutlined className="site-form-item-icon p-3" />}
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
            <Button type='text' htmlType="submit" className="w-full bg-[#ff4f67] border-none text-background hover:bg-[#ff4f67e4]">
                Log in
            </Button>
            Or <Button type='link' htmlType='button' onClick={() => setType('signup')} className=''>register now!</Button>
            <Button type='text' htmlType='button' onClick={handleGoogleOauth} className='w-full bg-[#ff4f67] border-none text-background hover:bg-[#ff4f67e4] mt-5' >Sign In with Google</Button>
            </Form.Item>
        </Form>
      
  )
}

export default Login