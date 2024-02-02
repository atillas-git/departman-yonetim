'use client'
import { Birim } from '@prisma/client'
import React, { useCallback, useEffect, useState } from 'react'
import BirimlerForm from './BirimlerForm';
import BirimlerTablosu from './BirimlerTablosu';
import { useSearchParams } from 'next/navigation';
interface IProps {
    birimler:Birim [];
    sayi:number;
    sayfaSayisi:number;
}
const BirimlerSayfası = ({birimler,sayfaSayisi}:IProps) => {
    const [seciliBirim,setSeciliBirim] = useState<Birim>()
    const [birimlerListesi,setBirimlerListesi] = useState(birimler)
    const [sayfa,setSayfa] = useState(sayfaSayisi)
    const searchParams = useSearchParams()


    const birimAra = useCallback(async()=>{
        const id = searchParams.get("id")
        const birimAdi = searchParams.get("birimAdi")
        const birimSorumlusuId = searchParams.get("birimSorumlusuId")
        const page = searchParams.get("page")
        try {
            const res = await fetch("/api/birimler/ara",{
                method:"POST",
                body:JSON.stringify({
                    id:id ? id :undefined,
                    birimAdi:birimAdi ? birimAdi : undefined,
                    birimSorumlusuId:birimSorumlusuId ? birimSorumlusuId :undefined,
                    page:parseInt(page || "1")
                })
            })
            if(res.ok){
                type Response = {
                    data:Birim[],
                    sayfaSayisi:number,
                }
                const response : Response = await res.json()
                setBirimlerListesi(response.data)
                setSayfa(response.sayfaSayisi)
            }
        } catch (error) {
            console.log(error)
        }
    },[searchParams])

    useEffect(()=>{
        setBirimlerListesi(birimler)
    },[birimler])

    useEffect(()=>{
        setSayfa(sayfaSayisi)
    },[sayfaSayisi])

    return (
    <div>
        <BirimlerForm 
            seciliBirim={seciliBirim}
            birimAra = {birimAra}
        />
        <BirimlerTablosu 
            birimler={birimlerListesi} 
            sayfaSayisi={sayfa} 
            setSeciliBirim={setSeciliBirim}
            birimAra = {birimAra}
        />
    </div>
  )
}

export default BirimlerSayfası