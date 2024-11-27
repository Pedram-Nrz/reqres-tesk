import "server-only";
import {UserType, RemoteUser} from "@/app/definition/UserDefinition.ts";
import {getUser} from "@/app/db/datahandler.ts"; 
import { revalidatePath } from "next/cache";
import prisma from "@/app/db/db.ts";


export async function createUsers(newUsers:RemoteUser, pageNum:number){
    const authenticatedUser = await getUser();
    if(!authenticatedUser){
        return {status:"fail", message:"please log in first"};
    }

    const users : UserType[] = newUsers?.data?.map((remoteUser)=>{
        const {id,first_name,last_name,email,avatar} = remoteUser;
        return {
            remote_id:id,
            first_name,
            last_name,
            avatar,
            email,
            is_naughty:false,
        };
    });

    try{
        const craetedUsers = await prisma.santaList.createMany({data:users, skipDuplicates:true});

        if(craetedUsers && craetedUsers.count){
            revalidatePath(`/users/${pageNum}`);
            return {status:"success", message:"", result:{count:craetedUsers.count}};
        }else{
            if(!craetedUsers){
                return {status:"fail", message:"failed to add new users"};
            }else{
                return {status:"fail", message:"no new user found"};
            }
        }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }catch(e){
        return {status:"fail", message:"failed to add new users"};
    }
}

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


    /* eslint-disable @typescript-eslint/no-explicit-any */
    /* eslint-disable @typescript-eslint/no-unused-vars */ 
    }catch(e:any){
        return {status:"fail",message:"failed to submit a new user"}
    }

}

export async function fetchUsers(take:number, skip:number | undefined){
    const authenticatedUser = await getUser();
    if(!authenticatedUser){
        return {status:"fail", message:"please log in first"};
    }

    const users = await prisma.santaList.findMany({where:{removed:false},skip,take});

    if(users){
        return {status:"success", message:"", count:users?.length || 0, result:{users}}
    }else{
        if(!users){
            return {status:"fail", message:"failed to fetch users"} 
        }
           
    }
 
}

export async function fetchUser(where:{remote_id:number}){
    const authenticatedUser = await getUser();
    if(!authenticatedUser){
        return {status:"fail", message:"please log in first"};
    }

    const user = await prisma.santaList.findUnique({where});
    if(user){
        return {status:"success", message:"", result:{user}}
    }else{
        return {status:"fail", message:"no user found"};
    }
    
}


export async function updateUser(userid:number, is_naughty:boolean){
    const authenticatedUser = await getUser();

    if(!authenticatedUser){
        return {status:"fail", message:"please log in first"};
    }
 
    try{

        const matchedUser = await prisma.santaList.findUnique({where:{remote_id:userid}});
        
        if(!matchedUser){
            return {status:"fail", message:"No such user available"};
        }

        const updatedUser = await prisma.santaList.update({where:{remote_id:userid},data:{is_naughty}});

        if(!updateUser){
            return {status:"fail", message:"something went wrong updating a user"};
        }else{
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
        await prisma.santaList.update({data:{removed:true},where});
        revalidatePath("/");
        return;
    }catch(e){
        return {status:"fail", message:"failed to delete a user"};
    }


}