import React from 'react'
import { Button } from './button'
import { Input } from './input'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
interface IProps {
    maxPageCount:number
}
const Pagination = ({maxPageCount}:IProps) => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathName = usePathname()

    let page = parseInt(searchParams.get("page") || "1")

    const forward = ()=>{
        const params = new URLSearchParams(searchParams)
        const nextPage = page +1
        params.set("page",String(nextPage))
        router.replace(`${pathName}?${params.toString()}`)
    }

    const backward = ()=>{
        const params = new URLSearchParams(searchParams)
        const nextPage = page === 1 ? 1 : page - 1;
        params.set("page",String(nextPage))
        router.replace(`${pathName}?${params.toString()}`)
    }

    const handlePageChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const params = new URLSearchParams(searchParams)
        const nextPage = e.target.value;
        params.set("page",nextPage)
        router.replace(`${pathName}?${params.toString()}`)
    }

    return (
    <div className='flex items-center gap-3 max-w-fit text-sm '>
        <Button variant={'outline'} onClick={backward} disabled = {page === 1}>
            Geri
        </Button>
        <p>Sayfa</p>
        <Input type='number' value={page} min={1} max={maxPageCount} onChange={handlePageChange}/>
        <p>{maxPageCount}</p>
        <Button variant={'outline'} onClick={forward} disabled = {maxPageCount === page}>
            İleri
        </Button>
    </div>
  )
}

export default Pagination