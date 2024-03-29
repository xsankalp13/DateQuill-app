'use client'
import Login from '@/components/Login';
import SignUp from '@/components/Signup';
import { LoadingSpinner } from '@/hooks/useLoader';
import { loginVector } from '@/public';
import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Spin } from 'antd';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'

type FormDataProps = {
  email: string,
  password: string
}

const page = () => {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [type,setType] = useState<'login' | 'signup'>('login')

  const router = useRouter();
  const supabase = createClientComponentClient();
  
  supabase.auth.onAuthStateChange((event, session) => {
    if (session && session.provider_token) {
      window.localStorage.setItem('oauth_provider_token', session.provider_token)
    }
  
    if (session && session.provider_refresh_token) {
      window.localStorage.setItem('oauth_provider_refresh_token', session.provider_refresh_token)
    }
  
    if (event === 'SIGNED_OUT') {
      window.localStorage.removeItem('oauth_provider_token')
      window.localStorage.removeItem('oauth_provider_refresh_token')
    }
  })
  
  useEffect(() => {
    async function getUser() {
      const {data: {user}} = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);

    }
    getUser();
  },[])

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    setUser(null);
  }


  

  if(loading) return <Spin size="large" className="flex h-screen justify-center items-center" />;

  if(user) {
    return (
      <div className="p-4 bg-gray-100">
          <p className="text-gray-700 mb-2">{user.email}</p>
          <button 
            onClick={handleLogout}
            className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-blue-600"
          >
            Sign Out
          </button>
      </div>
    )
  }
  return (

    <main className='h-screen flex items-center w-11/12 mx-auto '>
      <Image src={loginVector} alt='loginvector' className='w-[50%] ' />
      
      {
        type === 'signup' ? <SignUp setType={setType}/> : <Login setType={setType}/>
      }

    </main>
  )
}

export default page