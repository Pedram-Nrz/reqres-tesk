import Image from 'next/image';
import {getUser} from "@/app/db/datahandler.ts";
import { redirect } from 'next/navigation'; 
export default async function AuthLayout({children}: {children: React.ReactNode}) {
    const user = await getUser();

    if(user?.user && user?.user === "santa"){ 
        redirect("/");
    }

    return (
        <div className="flex flex-col lg:flex-row">
            <div className="lg:flex-none lg:w-4/12 xl:w-3/12 lg:min-h-screen h-32 bg-slate-300">
                <Image
                    className="h-full object-cover"
                    src="/santa.jpg"
                    width={1199}
                    height={1193}
                    priority={true}
                    alt="santa relaxing"

                />
            </div>
            <div className="lg:flex-1">
                {children}
            </div>
        </div>
    );
}