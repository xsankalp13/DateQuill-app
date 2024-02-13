import React from 'react'
import PreviewPage from '../stripe'
import Bar from '@/components/Bar'
import Image from 'next/image'
import { PaymentVector } from '@/public'

const page = () => {
  return (
    <div>
        <Bar status={["process","wait","wait"]} />
        
        <div className=' h-[cal(100vh - 5rem )]  flex  w-11/12 mx-auto '>

            <Image src={PaymentVector} alt='loginvector' className='w-[50%] ' />
            
            <div className='h-full mt-24 '>
              <h1 className='text-xl uppercase mb-10'>choose a plan:</h1>
              <PreviewPage/>
            </div>
        </div>
    </div>
  )
}

export default page