import BirimlerSayfası from '@/components/birimler/BirimlerSayfası'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import React from 'react'

const Birimler = async ({
    searchParams,
  }: {
    searchParams: { [key: string]: string | undefined }
  }) => {

    let skip = (parseInt(searchParams["page"] || "1")-1)*1
    let take = 1

    const birimler = await prisma.birim.findMany({
        where:{
            id:searchParams["id"],
            birimAdi:searchParams["birimAdi"],
            birimSorumlusuId:searchParams["birimSorumlusuId"]
        },
        include:{
            birimSorumlusu:true
        },
        skip:skip,
        take:take
    })

    const sayi = await prisma.birim.count(
        {
            where:{
                id:searchParams["id"],
                birimAdi:searchParams["birimAdi"],
                birimSorumlusuId:searchParams["birimSorumlusuId"]
            }
        }
    )
    const sayfaSayisi = Math.ceil(sayi/1)
    return (
    <div className='p-12 min-h-screen flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
            <p className='text-lg font-semibold'>Birimler</p>
            <Button>Excel Çıkart</Button>
        </div>
        <BirimlerSayfası birimler={birimler} sayfaSayisi={sayfaSayisi} sayi={sayi}/>
    </div>
  )
}

export default Birimler