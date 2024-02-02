'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

type Status = "loading" | "error" |"idle"

const GirisYap = () => {
    const [email,setEmail] = useState("")
    const [parola,setParola] = useState("")
    const [status,setStatus] = useState<Status>("idle")

    async function handleGirisYap (e:React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.preventDefault()
        try {
            setStatus("loading")
            signIn("credentials",{
                email:email,
                parola:parola,
                callbackUrl:"/app"
            })
        } catch (error) {
            console.log(error)
        } finally {
            setStatus("idle")
        }
    }

    const isLoading = status === "loading"

    return (
    <div className='min-h-screen grid grid-cols-6'>
        <div className='col-span-2 h-full bg-zinc-900'>

        </div>
        <div className='flex h-full flex-col items-center justify-center col-span-4 gap-3'>
            <div className='font-semibold w-1/2 flex flex-col gap-2 my-4'>
                <p className='text-2xl'>Giriş Yap</p>
                <p className='text-xs text-zinc-400'>Lütfen giriş yapın</p>
            </div>
            <div className='w-1/2 flex flex-col gap-2'>
                <div className='w-full flex flex-col gap-2'>
                    <Label htmlFor='email' className='font-semibold'>Email</Label>
                    <Input type='email' name='email' onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <Label htmlFor='parola' className='font-semibold'>Parola</Label>
                    <Input type='password' name='parola' onChange={(e)=>setParola(e.target.value)}/>
                </div>
                <Button 
                    disabled = {isLoading} 
                    className='gap-1' 
                    onClick={handleGirisYap}
                >
                    {isLoading
                        &&
                        <Loader2 className='animate-spin'/>
                    }
                    Giriş Yap
                </Button>
                <Button variant={'outline'}>
                    <Link href={"/kayitol"}>
                        Kayıt Ol
                    </Link>
                </Button>
            </div>
        </div>
    </div>
  )
}

export default GirisYap