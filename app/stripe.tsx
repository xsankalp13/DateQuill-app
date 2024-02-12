'use client'
import React from 'react';
import { checkout } from './checkout';

export default function PreviewPage() {
  return (
    <button className="p-4 rounded-md px-8 bg-blue-500 text-white"
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