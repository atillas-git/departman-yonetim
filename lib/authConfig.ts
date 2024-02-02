import { AuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import prisma from "./prisma";
export interface NSession extends Session{
  id:string | undefined
}
const authConfig : AuthOptions = {
    secret:process.env.NEXT_SECRET,
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. 'Sign in with...')
          name: 'Credentials',
          // The credentials is used to generate a suitable form on the sign in page.
          // You can specify whatever fields you are expecting to be submitted.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            email: { label: "Email", type: "email", },
            parola: { label: "Parola", type: "password" }
          },
          async authorize(credentials, req) {
            if(!credentials?.email || !credentials?.parola){
                return null;
            }

            const user = await prisma.calisan.findFirst({
                where:{
                    email:credentials.email
                }
            })
            
            if(!user){
                return null;
            }
            const compared = await bcrypt.compare(credentials.parola,user.parola ?? "");
            if(!compared){
                return null;
            }
            return user;
          }

        })
      ],
      pages:{
        signIn:"/girisyap"
      },
      callbacks:{
        async session({ session, user, token }) {
          (session as NSession).id = token.sub;
          return session
        },
      }
}
export default authConfig;