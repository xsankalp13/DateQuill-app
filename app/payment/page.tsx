import React from 'react'
import PreviewPage from '../stripe'
import Bar from '@/components/Bar'
import Image from 'next/image'
import { PaymentVector } from '@/public'
import { LoadingSpinner } from '@/hooks/useLoader'
import { Switch } from 'antd'

const page = () => {
  return (
    <div>
        <LoadingSpinner/>
        <Bar status={["process","wait","wait"]} />
        
        <div className=' h-[cal(100vh - 5rem )]  flex  w-11/12 mx-auto '>

            <Image src={PaymentVector} alt='loginvector' className='w-[50%] ' />
            
            <div className='h-full mt-24 '>
              <h1 className='text-xl uppercase mb-10'>choose a plan:</h1>
              <div className=' h-[80%] border flex flex-col items-center rounded-lg '>
                <div className='w-10/12 flex my-2 justify-between items-center'>
                  <h4 className='text-lg font-semibold mt-4'>Monthly</h4>
                </div>
                <p className='w-10/12'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                <div className='my-5 h-[1px] bg-gray-300'></div>
                <div className='flex justify-center gap-2 items-center'>
                  <h2 className='text-7xl font-semibold tracking-tighter'>$20</h2>
                  <div className='flex flex-col h-[85%]  justify-between'>
                    <p className='font-semibold'>monthly subscription</p>
                    <p>plus taxes</p>
                  </div>
                </div>
                <PreviewPage/>
              </div>
            </div>
        </div>
    </div>
  )
}

export default page