'use server'

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import {getUser} from "@/app/db/datahandler.ts";

export async function redirectAction(path:string,mustLoggedin:boolean){
    const user = await getUser();

    if(mustLoggedin && !user){
        return;
    }

    redirect(path);

}

export async function logoutAction(){
    const cookie = await cookies();
    if(cookie.has("session")){
        cookie.delete("session");
        revalidatePath("/");
        redirect("/");
    }else{
        return;
    }

    
}


export async function deleteUserAction(userid:number){
    const res = await fetch(`https://reqres.in/api/users/${userid}`,{
        method: "DELETE",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        }) 
        if(res.status === 204){
           revalidatePath("/users/1");
           redirect("/users/1");
           
        } 
}


export async function updateUserAction(userid:number){
    const res = await fetch(`https://reqres.in/api/users/${userid}`,{
        method: "PUT",
        body: JSON.stringify({ naughty: true }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        }) 
        if(res.status === 200){
            const data = await res.json();
            console.log(data)
           revalidatePath("/users/1");
           redirect("/users/1");
           
        } 
}


export async function CreateUserAction(username:string,isnaughty:boolean){
    const res = await fetch(`https://reqres.in/api/users`,{
        method: "POST",
        body: JSON.stringify({ username,naughty: isnaughty }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        }) 
        if(res.status === 201){
            const data = await res.json();
            console.log(data)
           revalidatePath("/users/1");
           redirect("/users/1");
           
        } 
}