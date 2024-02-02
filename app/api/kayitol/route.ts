import prisma from "@/lib/prisma"
import { genSalt, hash } from "bcryptjs"

export async function POST(req:Request) {
    try {
        type RequestBody = {
            email:string,
            kullaniciAdi:string,
            parola:string,
        }
        const body : RequestBody = await req.json()
        if(!body.email || !body.parola || !body.kullaniciAdi){
            return new Response("Invalid Credentials!",{
                status:400
            })
        }
        const varolanKulanici = await prisma.calisan.findFirst({
            where:{
                email:body.email
            }
        })
        if(varolanKulanici){
            return new Response("Kullanici zaten mevcut!",{status:400})
        }
        const salt = await genSalt(10)
        const newPass = await hash(body.parola,salt)
        await prisma.calisan.create({
            data:{
                email:body.email,
                parola:newPass,
                kullaniciAdi:body.kullaniciAdi
            }
        })
        return new Response("Success!",{status:200})
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}