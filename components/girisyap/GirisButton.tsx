'use client'
import React, { ButtonHTMLAttributes } from 'react'
import { Button } from '../ui/button'
import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'
interface IProps extends ButtonHTMLAttributes<HTMLButtonElement>{}
function GirisButton({...props}:IProps) {
    const {pending} = useFormStatus()
  return (
    <Button disabled = {pending} {...props} className='flex gap-1'>
        {pending
            &&
            <Loader2 className='animate-spin'/>
        }
        Giriş Yap
    </Button>
  )
}

export default GirisButton