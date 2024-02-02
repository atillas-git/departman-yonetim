"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { Users,ShoppingBasket,LibraryBig } from 'lucide-react';
import { signOut } from 'next-auth/react';
const Layout = ({children}:{children:React.ReactNode}) => {
    const handleSignout = ()=>{
        signOut({
            callbackUrl:"/girisyap"
        })
    }
    return (
    <div>
        <div className='grid grid-cols-7'>
            <div className='col-span-1 min-h-screen bg-zinc-900 p-4 flex flex-col gap-2'>
                <Link href={"/app"}>                
                    <div className='p-4 text-zinc-50 font-semibold text-lg border-b border-zinc-50  '>
                        <p>DeptConnect</p>
                    </div>
                </Link>
                <div className='w-full flex text-zinc-50 p-2 rounded-md 
                    transition hover:bg-zinc-700 cursor-pointer gap-2 items-center'>
                    <ShoppingBasket className='w-5 h-5'/>
                    <Link href={"/app/alimsatim"}>
                        <p>Alım Satım</p>
                    </Link>
                </div>
                <div className='w-full flex text-zinc-50 p-2 rounded-md 
                    transition hover:bg-zinc-700 cursor-pointer gap-2 items-center'>
                    <Users className='w-5 h-5'/>
                    <Link href={"/app/insanKaynaklari"}>
                        <p>İnsan Kaynakları</p>
                    </Link>
                </div>
                <div className='w-full flex text-zinc-50 p-2 rounded-md 
                    transition hover:bg-zinc-700 cursor-pointer gap-2 items-center'>
                    <LibraryBig className='w-5 h-5'/>
                    <Link href={"/app/birimler"}>
                        <p>Birimler</p>
                    </Link>
                </div>
                <div className='w-full mt-auto'>
                    <Button className='bg-zinc-50 text-zinc-900 w-full hover:bg-zinc-300' onClick={handleSignout}>Çıkış Yap</Button>
                </div>
            </div>
            <div className='col-span-6'>
                {children}
            </div>
        </div>
    </div>
  )
}

export default Layout