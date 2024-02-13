
import ProfileForm from './ProfileForm'
import Bar from '@/components/Bar'
import Image from 'next/image'
import { ProfileVector } from '@/public'
import { LoadingSpinner } from '@/hooks/useLoader'

const page = () => {
  return (
    <div>
        <LoadingSpinner/>
        <Bar status={["finish","process","wait"]} />
        <div className=' h-[cal(100vh - 5rem )] items-center  flex  w-11/12 mx-auto '>

            <Image src={ProfileVector} alt='loginvector' className='w-[50%] ' />
            
            <ProfileForm/>
            
        </div>
    </div>
  )
}

export default page