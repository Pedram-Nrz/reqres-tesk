'use server';
import {UserFomeSchema, UserFormState} from "@/app/definition/UserDefinition.ts";
import {getUser} from "@/app/db/datahandler.ts";
import {createUser} from "@/app/db/crud.ts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function NewUserFormAction(prevState:UserFormState, formData: FormData){
    const user = await getUser();

    if(!user || user?.user !== "santa"){
        redirect("/auth/login");
    }

    const {success, error, data} = UserFomeSchema.safeParse({
        firstname:formData.get("firstname"),
        lastname:formData.get("lastname"),
        email:formData.get("email"),
        isnaughty:formData.get("isnaughty")
    });

    if(!success){
        return {errors:error?.flatten().fieldErrors};
    }

    try{
        const {firstname, lastname, email, isnaughty} = data;

        const res = await fetch(`https://reqres.in/api/users`,{
            method: "POST",
            body: JSON.stringify({firstname, lastname, email, isnaughty}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            }) 
            if(res.status === 201){
               await createUser({
                first_name:firstname,
                last_name:lastname,
                email:email,
                is_naughty: isnaughty === "naughty",
                remote_id:Math.random() * 2000 + 2000,
                avatar:"/santa.jpg"
               });  
               revalidatePath("/users/1");
               return {message:"New user created successfully"};
            } 
            else{
            return {message:"Failed to create a new user"};
          }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }catch(error){  
        return {message:`something went wrong craeting a new user`};
    }

 

}