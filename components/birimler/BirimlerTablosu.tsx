'use client'
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Birim } from '@prisma/client'
import { Button } from '../ui/button'
import Pagination from '../ui/pagination'
interface IProps  {
    birimler : Birim []
    sayfaSayisi : number
    setSeciliBirim:React.Dispatch<any>
}
const BirimlerTablosu = ({birimler,sayfaSayisi,setSeciliBirim}:IProps) => {
    return (
        <div className='w-full'>
            <Table className='w-full'>
                <TableCaption>Birimler Tablosu</TableCaption>
                <TableHeader>
                    <TableRow className='w-full'>
                        <TableHead>Birim Numarası</TableHead>
                        <TableHead>Birim Adı</TableHead>
                        <TableHead>Birim Sorumlusu</TableHead>
                        <TableHead>Birim Sorumlusu Numarası</TableHead>
                        <TableHead>Seçenekler</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {birimler.map((birim)=>{
                        return (
                            <TableRow key={birim.id}>
                                <TableCell title={birim.id}>{birim.id}</TableCell>
                                <TableCell>{birim.birimAdi}</TableCell>
                                <TableCell>{birim.birimSorumlusu.kullaniciAdi}</TableCell>
                                <TableCell>{birim.birimSorumlusuId}</TableCell>
                                <TableCell className='gap-2 flex'>
                                    <Button onClick={()=>setSeciliBirim(birim)}>Düzenle</Button>
                                    <Button variant={'outline'}>Sil</Button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            <Pagination maxPageCount={sayfaSayisi}/>  
        </div>
    )
}

export default BirimlerTablosu