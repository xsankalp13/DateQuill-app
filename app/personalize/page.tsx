'use client'
import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { Step1,Step2,Step3,Step4,Step5 } from '.';
import { useSearchParams } from 'next/navigation';


const components = [<Step1/>,<Step2/>,<Step3/>,<Step4/>,<Step5/>]

const page =  () => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);


    const supabase = createClientComponentClient();
    useEffect(() => {
        async function getUser() {
            const {data: {user}} = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        }
        getUser();
      },[])
      const searchParams = useSearchParams();
      const temp = searchParams.get('step') || '1';
      const step = parseInt(temp);

    if(loading) return <p>Loading...</p>

  if(!user) return (
    <Link className=' p-2 px-4 rounded-md text-white bg-blue-500 ' href={`/login`}>
        Click to login
    </Link>
  )
  return (
    <>
      <nav className='w-11/12 mx-auto flex justify-between mt-10'>
        <h1>Date Quill</h1>
        <p>Hello {user.user_metadata.name}</p>
      </nav>
      <main>
            {components[step-1] || <Step1/>}
            <Link href={`/personalize?step=${step+1}`}>Next</Link>
      </main>
    </>
  )
}

export default page