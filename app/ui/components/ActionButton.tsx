'use client'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ActionButton({action,name,style="text-green-400 font-semibold text-nowrap text-base"}:{action:(...args:any[])=>Promise<void>, name:string, style?:string}){

    return (
        <button onClick={async () => {action()}} className={style}>
            <span className="">{name}</span> 
        </button>
    );

} 
 