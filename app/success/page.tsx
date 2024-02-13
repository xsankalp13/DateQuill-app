import Bar from '@/components/Bar'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div> 
      <Bar status={["finish","finish","finish"]} />
      <h1>Success</h1>
      <Link href={'/'}>Explore the App</Link>
    </div>
  )
}

export default page