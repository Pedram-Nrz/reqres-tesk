import {getUser} from "@/app/db/datahandler.ts";
import { redirect } from "next/navigation";
import ActionButton from "@/app/ui/components/ActionButton.tsx";
import {logoutAction} from "@/app/actions/buttonsActions.ts";

export default async function Home() {
  const user = await getUser();

  if(!user || user?.user !== "santa"){
    redirect("/auth/login");
  }else{
    redirect("/users/1");
  }

  return (
    <div className="">
        {
          user && user?.user === "santa" 
          ? <div className="px-8 py-4 border-b border-slate-600 flex flex-row justify-end">
            <ActionButton name="Logout" action={logoutAction.bind(null)}/>
          </div>
          : null
        }
    </div>
  );
}
