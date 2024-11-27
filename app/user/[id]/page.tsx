import {getUser} from "@/app/db/datahandler.ts";
import { redirect } from "next/navigation";
import ActionButton from "@/app/ui/components/ActionButton.tsx";
import {logoutAction, redirectAction,deleteUserAction,updateUserAction} from "@/app/actions/buttonsActions.ts";
import {RemoteUserDetails} from "@/app/definition/UserDefinition.ts";

export default async function UserDetailsPage({params}: {params: Promise<{ id: string }>}) {
  const id = (await params).id
  const user = await getUser();

  if(!user || user?.user !== "santa"){
    redirect("/auth/login");
  }

  const data = await fetch(`https://reqres.in/api/users/${id}`);
  let userdetail : RemoteUserDetails = await data.json();

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
          <ul className="divide-y divide-slate-500">

            {
              userdetail && userdetail?.data
              ? 
              (<li key={userdetail?.data?.id} className="py-4">
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
                  <div className="lg:flex-none w-fit">
                    <img
                        className="object-cover rounded-md bg-white shadow-lg"
                        src={userdetail?.data?.avatar}
                        width={60}
                        height={60} 
                        alt="user"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <div>
                      <div>{userdetail?.data?.first_name} {userdetail?.data?.last_name}</div>
                      <div>{userdetail?.data?.email}</div>
                    </div>
                    <div className="flex flex-row gap-4">
                      <div className="w-fit"><ActionButton name="Update" action={updateUserAction.bind(null,userdetail?.data?.id)}/></div>
                      <div className="w-fit"><ActionButton name="Delete" action={deleteUserAction.bind(null,userdetail?.data?.id)}/></div>
                    </div>
                  </div>
  
                </div>
                </li> )     
              : null
            }
      
          </ul>
        </div>  

    </div>
  );
}

 