'use client'
import React from 'react';
import { checkout } from './checkout';

export default function PreviewPage() {
  return (
    <button className=" w-10/12 mx-auto py-4 rounded-md my-4 bg-[#ff4f67] text-white"
      onClick={(()=>{
        checkout(
          {
            lineItems:[{price:"price_1OhraxSA9PUKTrSj5phjn7o9",quantity:1}]
          }
        )
      })}
      >Buy This plan</button>
  );
}