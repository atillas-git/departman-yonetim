import prisma from "@/lib/prisma"

export async function GET(req:Request) {
    try {
        const calisanlar = await prisma.calisan.findMany()
        return new Response(JSON.stringify(calisanlar),{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:500
        })
    }
    
}