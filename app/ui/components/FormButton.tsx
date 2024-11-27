'use client'
import { useFormStatus } from "react-dom"

export default function FormButton({title}:{title:{idle:string, pending:string}}){
    const {pending} = useFormStatus();

    return (
        <button className={`${pending ? 'bg-black text-slate-300 border border-slate-300' : 'bg-white text-black border-none'}  font-bold text-base min-w-fit w-8/12 text-center px-12 py-3 lg:py-4 rounded-xl `} disabled={pending}>{pending ? title.pending : title.idle}</button>
    );
}