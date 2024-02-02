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
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Birim } from '@prisma/client'
import { Button } from '../ui/button'
import Pagination from '../ui/pagination'
interface IProps  {
    birimler : Birim []
    sayfaSayisi : number
    setSeciliBirim:React.Dispatch<any>,
    birimAra:() => Promise<void>
}
const BirimlerTablosu = ({birimler,sayfaSayisi,setSeciliBirim,birimAra}:IProps) => {
    const handleBirimSil = async (birimId:string)=>{
        const res = await fetch("/api/birimler",{
            method:"DELETE",
            body:JSON.stringify({
                id:birimId
            })
        })
        await birimAra()
    }
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
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant={'outline'}>Sil</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Silmek istediğinize emin misiniz?
                                                </DialogTitle>
                                                <DialogDescription>Seçili birimi silmek istiyorsanız hiçbir çalışanın bu birime bağlı olmadığına emin olun.</DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <DialogClose>
                                                    <Button onClick={()=>handleBirimSil(birim.id)}>Sil</Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
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