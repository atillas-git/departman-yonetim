import AlimSatımForm from '@/components/alimsatim/AlimSatımForm'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import { Birim, Calisan, Malzeme } from '@prisma/client'
import React, { Suspense } from 'react'

const AlimSatim = async () => {
  const malzemeler : Malzeme [] = await prisma.malzeme.findMany()
  const calisanlar :Calisan [] = await prisma.calisan.findMany()
  const birimler : Birim [] = await prisma.birim.findMany()
  return (
    <div className='p-12 min-h-screen flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
            <p className='font-semibold text-2xl'>Alım Satım</p>
            <Button>Excele Çıkart</Button>
        </div>
        <Suspense>
          <AlimSatımForm malzemeler = {malzemeler} calisanlar = {calisanlar}/>
        </Suspense>
    </div>
  )
}

export default AlimSatim