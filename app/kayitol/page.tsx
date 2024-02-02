"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { Label } from '@radix-ui/react-label'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

type Status = "loading" | "error" |"idle"

const KayitOl = () => {
  const [email,setEmail] = useState("")
  const [parola,setParola] = useState("")
  const [repass,setRePass] = useState("")
  const [kullaniciAdi,setKullaniciAdi] = useState("");
  const [status,setStatus] = useState<Status>("idle")
  const { toast } = useToast()
  const router = useRouter()
  const isLoading = status === "loading"

  async function handleKayitOl() {
    try {
        if(!email || !parola || !repass || (parola !== repass)){
            throw new Error()
        }
        setStatus("loading")
        const res = await fetch("/api/kayitol",{
            method:"POST",
            body:JSON.stringify({
                email:email,
                kullaniciAdi:kullaniciAdi,
                parola:parola
            })
        })
        if(!res.ok){
            throw new Error()
        }
        router.replace("/girisyap")
    } catch (error) {
        toast({
            title:"Yanliş kullanıcı adı veya parola",
            description:"Lütfen tekrar deneyin",
            variant:"destructive"
        })
    } finally {
        setStatus("idle")
    }
  }

  return (
  <div className='min-h-screen grid grid-cols-6'>
      <div className='col-span-2 h-full bg-zinc-900'>

      </div>
      <div className='flex h-full flex-col items-center justify-center col-span-4 gap-3'>
          <div className='font-semibold w-1/2 flex flex-col gap-2 my-4'>
              <p className='text-2xl'>Kayıt Ol</p>
              <p className='text-xs text-zinc-400'>Lütfen kayıt olun</p>
          </div>
          <div className='w-1/2 flex flex-col gap-2'>
              <div className='w-full flex flex-col gap-2'>
                  <Label htmlFor='email' className='font-semibold'>Email</Label>
                  <Input type='email' name='email' onChange={(e)=>setEmail(e.target.value)}/>
              </div>
              <div className='w-full flex flex-col gap-2'>
                  <Label htmlFor='email' className='font-semibold'>Kullacı Adı</Label>
                  <Input type='email' name='email' onChange={(e)=>setKullaniciAdi(e.target.value)}/>
              </div>
              <div className='w-full flex flex-col gap-2'>
                  <Label htmlFor='parola' className='font-semibold'>Parola</Label>
                  <Input type='password' name='parola' onChange={(e)=>setParola(e.target.value)}/>
              </div>
              <div className='w-full flex flex-col gap-2'>
                  <Label htmlFor='parola' className='font-semibold'>Parola Tekrar</Label>
                  <Input type='password' name='parola' onChange={(e)=>setRePass(e.target.value)}/>
              </div>
              <Button 
                  disabled = {isLoading} 
                  className='gap-1'
                  onClick={handleKayitOl} 
              >
                  {isLoading
                      &&
                      <Loader2 className='animate-spin'/>
                  }
                  Kayıt Ol
              </Button>
          </div>
      </div>
  </div>
  )
}

export default KayitOl