import "server-only";
import { revalidatePath } from "next/cache"; 
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import {verifySession} from "@/app/db/sessionhandler.ts";

export async function onlyLoggedouts(){
    const cookie = await cookies();
    const session = cookie.get("session");

    if(session){ 
        revalidatePath("/");
        redirect("/");
    }

    return;
}

export const checkSession = cache(async () => {
    const cookie = await cookies();
    const session = cookie.get("session")?.value;   

    if(session){
        const verifiedSession = await verifySession(session);

        if(!verifiedSession || !verifiedSession?.userToken){
            return null;
        }else{
            return {isAuth:true, userToken : verifiedSession?.userToken}
        }

    }else{
        return null;
    }
    

});


export const getUser = cache(async ()=>{
    const session = await checkSession();

    if(session && session.isAuth && session.userToken){
        return {user:'santa'};
    }else{
        return null;
    }

});