import "server-only";
import {UserType} from "@/app/definition/UserDefinition.ts";
import {getUser} from "@/app/db/datahandler.ts"; 
import { revalidatePath } from "next/cache";
import prisma from "@/app/db/db.ts";

export async function createUser(newUser:UserType){
    const authenticatedUser = await getUser();
    
    if(!authenticatedUser?.user){
        return {status:"fail",message:"please log in first"};
    }

    const {remote_id,first_name,last_name,email,is_naughty,avatar} = newUser;


    try{

        const user = await prisma.santaList.create({
            data:{
                remote_id,
                first_name,
                last_name,
                email,
                avatar,
                is_naughty
            }
        });

        if(user){
            revalidatePath("/");
            return {status:"success", message:"", result:{user}};

        }else{
            return {status:"fail", message:"failed to create a new user"};
        }


        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }catch(e){
        return {status:"fail",message:"failed to submit a new user"}
    }

}

export async function fetchUser(where:{remote_id:number}){
    const authenticatedUser = await getUser();
    if(!authenticatedUser){
        return {status:"fail", message:"please log in first"};
    }

    const user = await prisma.santaList.findUnique({where});
    return user;
}

export async function updateUser(user:UserType){
    const authenticatedUser = await getUser();

    if(!authenticatedUser){
        return {status:"fail", message:"please log in first"};
    }

    const {remote_id, is_naughty} = user;


    try{

        const matchedUser = await prisma.santaList.findUnique({where:{remote_id}});
        
        if(!matchedUser){
            return {status:"fail", message:"No such user available"};
        }

        const updatedUser = await prisma.santaList.update({where:{remote_id},data:{is_naughty}});

        if(!updateUser){
            return {status:"fail", message:"something went wrong updating a user"};
        }else{
            revalidatePath("/");
            return {status:"success", message:"User updated successfully", result:{updatedUser}};
        }


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }catch(e){
        return {status:"fail", message:"failed to update the user"};
    }


}

export async function deleteUser(where:{remote_id:number}){
    const authenticatedUser = await getUser();
    if(!authenticatedUser){
        return {status:"fail", message:"please log in first"};
    }

    try{
        await prisma.santaList.delete({where});
        revalidatePath("/");
        return;
    }catch(e){
        return {status:"fail", message:"failed to delete a user"};
    }


}