import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function POST(request:Request) {
    try {
        type Body = {
            birimAdi:string,
            birimSorumlusuId:string    
        }
        const body : Body = await request.json()

        if(!body.birimAdi || !body.birimSorumlusuId){
            return new Response("Yanlış veri!",{
                status:400
            })
        }

        const birimSorumlusu = await prisma.calisan.findFirst({
            where:{
                id:body.birimSorumlusuId
            }
        })
        
        if(!birimSorumlusu){
            return new Response("Yanlış birim sorumlusu!",{
                status:400
            })
        }
        const birim = await prisma.birim.create({
            data:{
                birimAdi:body.birimAdi,
                birimSorumlusu:{
                    connect:{
                        id:body.birimSorumlusuId
                    }
                }
            }
        })
        revalidatePath("/birimler")
        return new Response(JSON.stringify(birim),{
            status:200
        })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}

export async function PUT(request:Request) {
    try {
        type Body = {
            id:string,
            birimAdi:string,
            birimSorumlusuId:string    
        }
        const body : Body = await  request.json()

        if( !body.id || !body.birimAdi || !body.birimSorumlusuId){
            return new Response("Yanlış veri!",{
                status:400
            })
        }

        const birimSorumlusu = await prisma.calisan.findFirst({
            where:{
                id:body.birimSorumlusuId
            }
        })
        if(!birimSorumlusu){
            return new Response("Yanlış birim sorumlusu!",{
                status:400
            })
        }
        const birim = await prisma.birim.update({
            where:{
                id:body.id
            },
            data:{
                birimAdi:body.birimAdi,
                birimSorumlusu:{
                    connect:{
                        id:body.birimSorumlusuId
                    }
                }
            }
        })
        revalidatePath("/birimler")
        return new Response(JSON.stringify(birim),{
            status:200
        })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}