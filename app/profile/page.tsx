import React from 'react'
import ProfileForm from './ProfileForm'
import Bar from '@/components/Bar'
import Image from 'next/image'
import { ProfileVector } from '@/public'

const page = () => {
  return (
    <div>
        <Bar status={["finish","process","wait"]} />
        <div className=' h-[cal(100vh - 5rem )] items-center  flex  w-11/12 mx-auto '>

            <Image src={ProfileVector} alt='loginvector' className='w-[50%] ' />
            
            <ProfileForm/>
            
        </div>
    </div>
  )
}

export default page