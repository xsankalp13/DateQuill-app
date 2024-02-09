'use client'
import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { NextResponse } from 'next/server';
import React, { useEffect, useState } from 'react'

const page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [situations, setSituations] = useState('hold');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);


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

  
  const handleSignUp = async () => {
    const {data,error} =  await supabase.auth.signUp({
      email,
      password,
      options:{
        emailRedirectTo : `${location.origin}/auth/callback`
      }
    })
    setEmail('');
    setPassword('');
    if(data) setSituations('success');
    if(error) setSituations('error');
    setUser(data?.user)
    router.push('/');
  }
  const handleSignIn = async () => {
    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    setUser(res.data.user)
    setEmail('');
    setPassword('');
    router.push('/');
  }
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    setUser(null);
  }


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




  console.log(loading,user);
  if(loading) return <p>Loading...</p>

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
    <main className='h-screen flex items-center justify-center bg-gray-800 p-6  flex-col'>
      <input
        type='email'
        name='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder='email'
        className='p-3 m-2 w-80 rounded-md bg-gray-200'
      />
      <input
        type='password'
        name='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder='password'
        className='p-3 m-2 w-80 rounded-md bg-gray-200'
      />
      {
        situations === 'success' && <p className='text-green-500'>Check your email for confirmation</p>
      }
      {
        situations === 'error' && <p className='text-red-500'>Error</p>
      }
      <div className='flex justify-between w-80 mt-2'>
        <button onClick={handleSignUp} className='p-2  bg-blue-500 text-white w-36 rounded-md'>Sign Up</button>
        <button onClick={handleSignIn} className='p-2  bg-blue-500 text-white w-36 rounded-md'>Sign In</button>
      </div>
      <button onClick={handleGoogleOauth} className='p-2 mt-2 bg-blue-500 text-white w-80 rounded-md'>Google</button>
    </main>
  )
}

export default page