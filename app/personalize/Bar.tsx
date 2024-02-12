'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { ChangeEventHandler } from 'react'

const Bar = () => {
    const searchQuerty = useSearchParams();
    const temp = searchQuerty.get('step') || '0';
    const step = parseInt(temp)
    const steps = [1,2,3,4,5];
    const router = useRouter();
    const handleRadioChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const temp = event.target.value || '0';
        const step = parseInt(temp, 10);
        router.push(`/personalize?step=${step}`);
    };
  return (
    <ul> 
        {steps.map((_,i) => {
            return(
                <li>
                    <input type="radio" name="navi" id="navi" onChange={handleRadioChange}/>            
                </li>
            )
        })}
    </ul>
  )
}

export default Bar