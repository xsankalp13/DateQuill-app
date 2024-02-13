'use client'
import React from 'react';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Steps } from 'antd';
import './Bar.css'


interface BarProps {
    status: ['finish' | 'process' | 'wait' | 'error', 'finish' | 'process' | 'wait' | 'error', 'finish' | 'process' | 'wait' | 'error']
}

const Bar: React.FC<BarProps> = ({status}) => {
    
        
    return (
        <Steps className='w-11/12 mx-auto my-10'
              items={[
                {
                  title: 'Login',
                  status: 'finish',
                  icon: <UserOutlined className='text-[#ff4f67] ' />,
                  className: 'text-[#1F1E1D] '
                },
                {
                  title: 'Pay',
                  status: status[0],
                  icon: status[0] === 'process' ? <LoadingOutlined className='text-[#ff4f67]'/> : <SolutionOutlined className='text-[#ff4f67]' />,
                  className: 'text-[#1F1E1D]'

                },
                {
                  title: 'User Details',
                  status: status[1],
                  icon: status[1] === 'process' ? <LoadingOutlined className='text-[#ff4f67]' /> : <UserOutlined className={`${status[1] === 'finish' ? 'text-[#ff4f67]' : ''}`} />,
                  className: 'text-[#1F1E1D]'

                },
                {
                  title: 'Done',
                  status: status[2],
                  icon: status[2] === 'process' ? <LoadingOutlined className='text-[#ff4f67]' /> : <SmileOutlined  className={`${status[1] === 'finish' ? 'text-[#ff4f67]' : ''}`} />,
                  className: 'text-[#1F1E1D]'

                },
              ]}
            />
    )
}

export default Bar;