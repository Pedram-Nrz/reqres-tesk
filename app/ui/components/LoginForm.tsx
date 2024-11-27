'use client'
import {useActionState} from "react";
import {LoginFormActionType} from "@/app/definition/UserDefinition.ts";
import FormButton from "@/app/ui/components/FormButton.tsx";

export default function LoginPage({action}:{action:LoginFormActionType}) {
    const [state, dispatch] = useActionState(action,undefined);
    return (
        <form action={dispatch} className="flex flex-col gap-6 w-fit">
            <div className="flex flex-col gap-3">
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
                <div> 
                    <input 
                        type="password" 
                        name="password"
                        placeholder="password"
                        className="appearance-none outline-none  focus:outline-none focus:border-white rounded-xl bg-transparent border border-slate-600 text-white placeholder:text-slate-500 px-8 py-3 lg:py-4"
                    />
                    {
                        state?.errors?.password?.map((err,idx)=>{
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
                <FormButton title={{idle:"Login", pending:"Authenticating..."}}/>
            </div>
        </form>
    );
}
