import React from 'react'
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { ShoppingBasket } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UsersRound } from 'lucide-react';
import { Columns4 } from 'lucide-react';
import { Container } from 'lucide-react';
const App = () => {
  return (
    <div className='p-12 grid grid-cols-3 gap-5'>
        <div className='col-span-3 text-xl font-semibold my-2'>
             <p>DeptConnect&apos;e hoşgeldiniz.</p>
        </div>
        <div className='col-span-1'>
            <Link href={"/app/alimsatim"}>            
                <Card className='w-full h-[10rem]'>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'> <ShoppingBasket/> Alım Satım</CardTitle>
                        <CardDescription>Alım satımlarınızı buradan yönetebilirsiniz</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button>Modüle git</Button>
                    </CardFooter>
                </Card>
            </Link>
        </div>
        <div className='col-span-1'>
            <Link href={"/app/insanKaynaklari"}>            
                <Card className='w-full'>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'> <UsersRound/> Insan Kaynakları</CardTitle>
                        <CardDescription>Kullanıcı izinlerini ve çalışanları buradan yönetebilirsiniz.</CardDescription>
                    </CardHeader>
                    <CardFooter className='flex gap-4 justify-between'>
                        <Button>Modüle git</Button>
                    </CardFooter>
                </Card>
            </Link>
        </div>
        <div className='col-span-1'>
            <Link href={"/app/birimler"}>            
                <Card className='w-full'>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'> <Columns4/> Birimler</CardTitle>
                        <CardDescription>Şirketinizin birimlerini buradan yönetebilirsiniz.</CardDescription>
                    </CardHeader>
                    <CardFooter className='flex gap-4 justify-between'>
                        <Button>Modüle git</Button>
                    </CardFooter>
                </Card>
            </Link>
        </div>
        <div className='col-span-1'>
            <Link href={"/app/malzeme"}>            
                <Card className='w-full'>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'> <Container/> Malzeme</CardTitle>
                        <CardDescription>Malzeme yönetimini buradan yapabilirsiniz</CardDescription>
                    </CardHeader>
                    <CardFooter className='flex gap-4 justify-between'>
                        <Button>Modüle git</Button>
                    </CardFooter>
                </Card>
            </Link>
        </div>
    </div>
  )
}

export default App