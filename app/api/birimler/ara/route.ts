import prisma from "@/lib/prisma"

export async function POST(req:Request) {
    try {
        type Body = {
            id?:string,
            birimAdi?:string,
            birimSorumlusuId?:string,
            page:number,
        }
        const {page,...body} : Body = await req.json()

        let skip = (page-1)*1
        let take = 1

        const birimler = await prisma.birim.findMany({
            where:{
                ...body
            },
            skip:skip,
            take:take,
            include:{
                birimSorumlusu:true
            }
        })

        const count = await prisma.birim.count({
            where:{
                ...body
            }
        })

        const sayfaSayisi = Math.ceil(count/1)

        return new Response(JSON.stringify({
            data:birimler,
            sayfaSayisi:sayfaSayisi
        }),{
            status:200
        })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
}