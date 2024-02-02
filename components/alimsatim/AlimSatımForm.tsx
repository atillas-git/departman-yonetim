'use client'
import React, { useCallback } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Calisan, Malzeme } from '@prisma/client'
import Select from 'react-select'

interface IProps {
    malzemeler:Malzeme [];
    calisanlar:Calisan []
}

const AlimSatımForm = ({malzemeler,calisanlar}:IProps) => {
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()

    const createQueryString = useCallback(
        (name: string, value: string) => {
          const params = new URLSearchParams(searchParams)
          if(!value){
            params.delete(name)
          }
          else{
              params.set(name, value)
          }
     
          return params.toString()
        },
        [searchParams]
    )

    const appendQueryToPath = (name:string)=>{
        return (e:any)=>{
            router.replace(`${pathName}?${createQueryString(name,e.target.value)}`)
        }
    }

    return (
    <div className='w-full grid grid-cols-2 gap-2'>
        <div className='col-span-1 flex flex-col gap-2'>
            <div className='w-full flex flex-col gap-2'>
                <Label>Talep Numarası</Label>
                <Input type='text' value={searchParams.get("id") || ""} onChange={appendQueryToPath("id")}/>
            </div>
            <div className='w-full flex flex-col gap-2'>
                <Label>Talep Eden Kişi</Label>
                <Select 
                    options={calisanlar.map((calisan)=>({label:calisan.kullaniciAdi,value:calisan}))}
                    onChange={(newValue)=>console.log(newValue)}
                />
            </div>
            <div className='w-full flex flex-col gap-2'>
                <Label>Açıklama</Label>
                <Input 
                    type='text'
                    value={searchParams.get("aciklama") || ""}
                    onChange={appendQueryToPath("aciklama")}
                />
            </div>
            <div className='w-full flex flex-col gap-2'>
                <Label>Onay Tarihi</Label>
                <Input 
                    type='date'
                    value={searchParams.get("onayTarihi") || ""}
                    onChange={appendQueryToPath("onayTarihi")}
                />
            </div>
        </div>
        <div className='col-span-1 flex flex-col gap-2'>
            <div className='w-full flex flex-col gap-2'>
                <Label>Talep Eden Birim</Label>
                <Input 
                    type='text'
                    onChange={appendQueryToPath("talepEdenBirim")}
                    value={searchParams.get("talepEdenBirim") || ""}
                />
            </div>
            <div className='w-full flex flex-col gap-2'>
                <Label>Durum</Label>
                <Input 
                    type='text'
                    onChange={appendQueryToPath("durum")}
                    value={searchParams.get("durum") || ""}
                    />
            </div>
            <div className='w-full flex flex-col gap-2'>
                <Label>Talep Tarihi</Label>
                <Input 
                    type='date'
                    onChange={appendQueryToPath("talepTarihi")}
                    value={searchParams.get("talepTarihi") || ""}
                />
            </div>
            <div className='w-full flex flex-col gap-2'>
                <Label>Malzemeler</Label>
                <Select 
                    options={malzemeler.map((malzeme)=>({label:malzeme.malzemeAdi,value:malzeme}))}
                    onChange={(newValue)=>console.log(newValue)}
                />
            </div>
        </div>
        <div className='col-span-2 flex items-center justify-end gap-4'>
            <Button 
                variant={'outline'} 
                onClick={(e)=>router.replace(`${pathName}`)}
            >
                Temizle
            </Button>
            <Button>Ekle</Button>
        </div>
    </div>
  )
}

export default AlimSatımForm