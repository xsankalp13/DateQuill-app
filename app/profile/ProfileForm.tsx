'use client'
import React from 'react';
import { PhoneOutlined, UserOutlined } from '@ant-design/icons';


import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
} from 'antd';

import { countryCodes } from '@/constants';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const { Option } = Select;

const ProfileForm: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const onFinish = () => {
    router.push('/success')
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        {countryCodes.map((countryCode,index)=> {
            return(
                <Option key={countryCode} value={countryCode}>{countryCode}</Option>
            )
        })}
      </Select>
    </Form.Item>
  );
  return (
    <Form

      form={form}
      name="profile"
      onFinish={onFinish}
      initialValues={{ prefix: '+1' }}
      className='w-[44%]'
      scrollToFirstError
    >
      <Form.Item
        name="name"
        rules={[
          {
            type: 'string',
            message: 'The input is not valid name!',
          },
          {
            required: true,
            message: 'Please input your Full Name!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon p-3" />} placeholder="Full Name" type='text' />
      </Form.Item>

      <Form.Item
        name="phone"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
      <Input prefix={<PhoneOutlined className="site-form-item-icon p-3" />} placeholder="Phone Number" type='number' />

      </Form.Item>
      
      <div className='flex justify-between'>
        <Form.Item
          name="gender"
          rules={[{ required: true, message: 'Please select gender!' }]}
          className='w-[30%]'
          >
          <Select placeholder="select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
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
          <Checkbox>
            I have read the <Link href="#" className=' text-blue-600'>terms & conditions</Link>
          </Checkbox>
        </Form.Item>
      </div>
      <Form.Item>
        <Button type="text" htmlType='submit' className=' bg-[#ff4f67] px-5 border-none text-background hover:bg-[#ff4f67e4] mt-5'>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileForm;