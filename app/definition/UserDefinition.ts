import {z} from "zod";

export const SantaLoginFormSchema = z.object({
    email:z.string().trim().email({message:"please enter a valid email address"}),
    password:z.string().trim().min(1,{message:"please enter your password"})
}); 


export type SantaLoginFormState = 
    |
        {
                errors?:{
                    email?:string[],
                    password?:string[], 
                },
                message?:string
        }
    | undefined



export type LoginFormActionType = (prevState: SantaLoginFormState, formData: FormData) => Promise<SantaLoginFormState>   

 
 

export type RemoteUserDetails = {

    data: {
        id: number,
        email: string,
        "first_name": string,
        "last_name": string,
        avatar: string
    },
    support: {
      "url": string,
      "text": string
    }
  }


export type RemoteUser =  {
    page:number,
    "per_page":number,
    total:number,
    "total_pages":number,
    data:{
        id: number,
        email: string,
        "first_name": string,
        "last_name": string,
        avatar: string
    }[]

  }

export type UserType = {
    id:number,
    remote_id:number,
    first_name:string,
    last_name:string,
    email:string,
    avatar:string,
    is_naughty:boolean,
    created_at:Date,
    updated_at:Date
} 


export const UserFomeSchema = z.object({
    firstname:z.string().trim().min(1,{message:"please fill in the first name input"}).toLowerCase(),
    lastname:z.string().trim().min(1,{message:"please fill in the last name input"}),
    email:z.string().trim().email({message:"please enter a valid email address"}).toLowerCase(),
    isnaughty:z.boolean()
});

 
export type UserFormState = 
    |
        {
                errors?:{
                    firstname?:string[],
                    lastname?:string[],
                    email?:string[],
                    isnaughty?:string[]
                },
                message?:string
        }
    | undefined


