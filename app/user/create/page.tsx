import { redirect } from "next/navigation";
import {getUser} from "@/app/db/datahandler.ts";
import ActionButton from "@/app/ui/components/ActionButton.tsx";
import {logoutAction, redirectAction} from "@/app/actions/buttonsActions.ts";
import NewUserForm from "@/app/ui/components/NewUserForm.tsx";
import NewUserFormAction from "@/app/actions/NewUserFormAction.ts";
export default async function CreateUserPage(){
    const user = await getUser();

    if(!user || user?.user !== "santa"){
      redirect("/auth/login");
    }


    return (
        <div className="">
            <div>
                {
                    user && user?.user === "santa" 
                    ? <div className="px-8 py-4 border-b border-slate-600 flex flex-row justify-end">
                    <ActionButton name="Logout" action={logoutAction.bind(null)}/>
                    </div>
                    : null
                }
            </div>
            <div className="flex flex-col lg:my-20 my-10 px-4 lg:px-8 gap-4 max-w-7xl">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center border-b border-slate-600">
                    <div className="text-white font-semibold text-lg lg:text-3xl">
                    <div>Naughty & Nice List</div>
                    </div>
                    <div>
                        <div className="w-fit"><ActionButton name="Show All Users" action={redirectAction.bind(null,"/users/1")}/></div>
                    </div>
                </div>
                <div>
                    <div className="font-semibold text-lg py-6 text-blue-600">Add New User:</div>
                    <NewUserForm action={NewUserFormAction}/>
                </div>
            </div>

        </div>
    );
}