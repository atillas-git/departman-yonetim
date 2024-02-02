'use client'
import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Birim, Calisan } from '@prisma/client'
import ReactSelect from 'react-select'
import { Loader2 } from 'lucide-react'
import { useToast } from '../ui/use-toast'


type Status = "idle" | "loading" | "error"
interface IProps {
    seciliBirim:Birim
    birimAra :() => Promise<void>
}
const BirimlerForm = ({seciliBirim,birimAra}:IProps) => {
    const router = useRouter()
    const pathName = usePathname()
    const [status,setStatus] = useState<Status>("idle")
    const [calisanlar,setCalisanlar] = useState<Calisan []>([])
    const [birimAdi,setBirimAdi] = useState("")
    const [id,setId] = useState("")
    const [birimSorumlusu,setBirimSorumlusu] = useState<Calisan>()
    const { toast } = useToast()

    const loading = status === "loading"

    useEffect(()=>{
        const fetchCalisanlar = async ()=>{
            const res = await fetch("/api/calisanlar")
            const data : Calisan [] = await res.json()
            setCalisanlar(data)
        }
        fetchCalisanlar()
    },[])

    useEffect(()=>{
        if(seciliBirim){
            setId(seciliBirim.id)
            setBirimAdi(seciliBirim.birimAdi)
            setBirimSorumlusu(seciliBirim.birimSorumlusu)
        }
    },[seciliBirim])


    const handleAra = ()=>{
        const params = new URLSearchParams()
        id && params.set("id",id)
        birimAdi && params.set("birimAdi",birimAdi)
        birimSorumlusu && params.set("birimsorumlusuId",birimSorumlusu.id)
        router.replace(`${pathName}?${params.toString()}`)
    }

    const handleTemizle = ()=>{
        router.replace(`${pathName}`)
        temizle()
    }

    const temizle = ()=>{
        setBirimAdi("")
        setId("")
        setBirimSorumlusu(null)
    }

    const handleEkleVeyaDüzenle = async ()=>{
        if(!birimSorumlusu || !birimAdi){
            return toast({
                title:"Yanlış Veri !",
                description:"Birim Sorumlusu ve birim adi boş bırakılamaz!",
                variant:"destructive"
            })
        }
        if(id){
            setStatus("loading")
            const res = await fetch("/api/birimler",{
                method:"PUT",
                body:JSON.stringify({
                    id:id,
                    birimAdi:birimAdi,
                    birimSorumlusuId:birimSorumlusu.id
                })
            })
            if(res.ok){
                toast({
                    title:"Başarı ile güncellendi",
                    description:"Birim Başarı ile güncellendi!"
                })
                temizle()
                await birimAra()
            }
            else{
                toast({
                    title:"Veri Eklenme sirasında bir sorun oluştu!",
                    variant:"destructive"
                })
            }
            setStatus("idle")
        }
        else{
            setStatus("loading")
            const res = await fetch("/api/birimler",{
                method:"POST",
                body:JSON.stringify({
                    birimAdi:birimAdi,
                    birimSorumlusuId:birimSorumlusu.id
                })
            })
            if(res.ok){
                toast({
                    title:"Başarı ile eklendi",
                    description:"Birim Başarı ile eklenmiştir!"
                })
                temizle()
                await birimAra()
            }
            else{
                toast({
                    title:"Veri Eklenme sirasında bir sorun oluştu!",
                    variant:"destructive"
                })
            }
            setStatus("idle")
        }
    }

    return (
    <div className='w-full grid grid-cols-2 gap-2' >
        <div className='col-span-1 flex flex-col gap-2'>
            <div className='flex flex-col gap-2 w-full'>
                <Label htmlFor='Birim Numarası'>Birim Numarası</Label>
                <Input 
                    type='text' 
                    onChange={(e)=>setId(e.target.value)}
                    value={id}
                    name='id'
                />
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <Label 
                    htmlFor='Birim Numarası'
                >
                        Birim Adı
                </Label>
                <Input 
                    type='text'
                    onChange={(e)=>setBirimAdi(e.target.value)}
                    value={birimAdi}
                    name='birimAdi'
                />
            </div>
        </div>
        <div className='col-span-1 flex flex-col gap-2'>
            <div className='flex flex-col gap-2 w-full'>
                <Label htmlFor='Birim Numarası'>Birim Sorumlusu</Label>
                <ReactSelect
                    isClearable 
                    options={calisanlar.map((calisan)=>({label:calisan.kullaniciAdi,value:calisan}))}
                    onChange={(newValue)=>{
                        setBirimSorumlusu(newValue?.value)
                    }}
                    value={birimSorumlusu ? {label:birimSorumlusu.kullaniciAdi,value:birimSorumlusu}:{label:"",value:""}}
                />
            </div>
        </div>
        <div className='col-span-2 flex items-center justify-end gap-4'>
            <Button 
                variant={'outline'} 
                onClick={handleTemizle}
            >
                Temizle
            </Button>
            <Button onClick={handleAra} variant={'outline'}>
                Ara
            </Button>
            <Button type = {"submit"} disabled = {loading} onClick={handleEkleVeyaDüzenle} className='gap-2'>
                {loading && <Loader2 className='animate-spin'/>}
                Kayıt Et
            </Button>
        </div>
    </div>
  )
}

export default BirimlerForm