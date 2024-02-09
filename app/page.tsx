import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'
import Link from 'next/link'
import React from 'react'
import PreviewPage from './stripe';
import { checkout } from './checkout';

const page = async () => {
  const cookieStore = cookies();

  const supabase = createServerComponentClient({cookies: () => cookieStore});
  
  const {data} = await supabase.auth.getUser();
  const session = await supabase.auth.getSession();
  
  
  if(!data.user) return (
    <Link className=' p-2 px-4 rounded-md text-white bg-blue-500 ' href={`/login`}>
        Click to login
    </Link>
  )
  return (
    <>
      <h1>You are logged in</h1>
      <Link className=' p-2 px-4 rounded-md text-white bg-blue-500 ' href={`/login`}>
        Click to logout
      </Link>
      <PreviewPage/>
    </>
  )
}

export default page