'use client'
import {useActionState} from "react";
import {NewUserFormActionType} from "@/app/definition/UserDefinition.ts";
import FormButton from "@/app/ui/components/FormButton.tsx";

export default function NewUserForm({action}:{action:NewUserFormActionType}) {
    const [state, dispatch] = useActionState(action,undefined);
    return (
        <form action={dispatch} className="flex flex-col gap-6 w-fit">
            <div className="flex flex-col gap-3">
                <div> 
                    <input 
                        type="text" 
                        name="firstname"
                        placeholder="First Name"
                        className="appearance-none outline-none  focus:outline-none focus:border-white rounded-xl bg-transparent border border-slate-600 text-white placeholder:text-slate-500 px-8 py-3 lg:py-4"
                    />
                    {
                        state?.errors?.firstname?.map((err,idx)=>{
                            return <div className="text-xs mt-1 text-red-500 px-2" key={`email-${idx}`}>{err}</div>
                        })
                    }
                </div>
                <div> 
                    <input 
                        type="text" 
                        name="lastname"
                        placeholder="Last Name"
                        className="appearance-none outline-none  focus:outline-none focus:border-white rounded-xl bg-transparent border border-slate-600 text-white placeholder:text-slate-500 px-8 py-3 lg:py-4"
                    />
                    {
                        state?.errors?.lastname?.map((err,idx)=>{
                            return <div className="text-xs mt-1 text-red-500 px-2" key={`email-${idx}`}>{err}</div>
                        })
                    }
                </div>
                <div> 
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Email Address"
                        className="appearance-none outline-none  focus:outline-none focus:border-white rounded-xl bg-transparent border border-slate-600 text-white placeholder:text-slate-500 px-8 py-3 lg:py-4"
                    />
                    {
                        state?.errors?.email?.map((err,idx)=>{
                            return <div className="text-xs mt-1 text-red-500 px-2" key={`email-${idx}`}>{err}</div>
                        })
                    }
                </div>
                <div className="flex flex-col my-2 space-y-1"> 
                    <label className="pl-1">Are They Nice or Naughty:</label>
                    <select 
                        name="isnaughty" 
                        className="outline-none hover:cursor-pointer focus:outline-none focus:border-white rounded-xl bg-[#0a0a0a] border border-slate-600 text-white placeholder:text-slate-500 px-4 py-3 lg:py-4">
                        
                        <option className="bg-transparent" value="nice">Nice</option>
                        <option className="bg-transparent" value="naughty">Naughty</option>


                    </select>
                    {
                        state?.errors?.isnaughty?.map((err,idx)=>{
                            return <div className="text-xs mt-1 text-red-500 px-2" key={`pass-${idx}`}>{err}</div>
                        })
                    }
                </div>
                <div>
                        {
                            state?.message ? <p  className="text-sm mt-1 text-red-500 px-2">{state?.message}</p> : null
                        }
                </div>
            </div>
            <div>
                <FormButton title={{idle:"Create", pending:"Creating..."}}/>
            </div>
        </form>
    );
}
