'use server';
import {SantaLoginFormSchema, SantaLoginFormState} from "@/app/definition/UserDefinition.ts";
import {onlyLoggedouts} from "@/app/db/datahandler.ts";
import {createSession} from "@/app/db/sessionhandler.ts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function LoginFormAction(prevState:SantaLoginFormState, formData: FormData){
    await onlyLoggedouts();

    const {success, error, data} = SantaLoginFormSchema.safeParse({
        email:formData.get("email"),
        password:formData.get("password")
    });

    if(!success){
        return {errors:error?.flatten().fieldErrors};
    }

    try{
        const {email,password} = data;
        const res = await fetch('https://reqres.in/api/login',{
          method: "POST",
          
          body: JSON.stringify({
              email: email,
              password: password, 
          }),
          headers: {
              "Content-type": "application/json; charset=UTF-8"
          }
          }) 
          if(res.ok){
            const data = await res.json();
            if(data?.token){

                await createSession(data?.token);

            }else{
                return {message:"failed to log in"};
            }
          }else{
            return {message:"Incorrect username or password"};
          }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }catch(error){  
        return {message:`something went wrong logging in-`};
    }

    revalidatePath("/users");
    redirect("/users/1");
 

}