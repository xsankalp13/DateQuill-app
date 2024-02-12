'use client'
import React, { useState } from 'react';

type FormDataProps = {
    email: string,
    password: string
}

interface LoginProps {
    setFormData: React.Dispatch<React.SetStateAction<FormDataProps | null>>;
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

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const SignUp= () => {
  const [form] = Form.useForm();

  const supabase = createClientComponentClient();
  const [formdata, setData] =  useState<FormDataProps | null>(null)

  const router = useRouter()

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
      className='w-fit'
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
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
        <Input.Password />
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
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
      Or <Link href="/login?type=login">register now!</Link>
    </Form>
  );
};

export default SignUp;