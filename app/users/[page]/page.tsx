import {getUser} from "@/app/db/datahandler.ts";
import { redirect } from "next/navigation";
import ActionButton from "@/app/ui/components/ActionButton.tsx";
import {logoutAction, redirectAction, CreateUserAction} from "@/app/actions/buttonsActions.ts";
import {createUsers, fetchUsers} from "@/app/db/crud.ts";
import {UserType, RemoteUser} from "@/app/definition/UserDefinition.ts";


export default async function UsersPage({params}: {params: Promise<{ page: string }>}) {
  const page = (await params).page
  const user = await getUser();
  let usersList : UserType[] = [];

  if(!user || user?.user !== "santa"){
    redirect("/auth/login");
  }
  
  const data = await fetch(`https://reqres.in/api/users?page=${page}`);
  let users : RemoteUser = await data.json();
  await createUsers(users, Number(page) || 1);
  const fetchedUsers = await fetchUsers(users.per_page, Number(page) || 1 > 1 ? (users.page - 1) * users.per_page: undefined);
  if(fetchedUsers?.count){
    usersList = [...fetchedUsers.result.users]; 
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
                  <div className="w-fit"><ActionButton name="+ Add New User" action={redirectAction.bind(null,"/user/create")}/></div>
              </div>
          </div>

          <ul className="divide-y divide-slate-500">

              {
                usersList && usersList.map((user)=>{
                  
                  return (
                    <li key={user?.id} className="py-4">
                      <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
                        <div className="lg:flex-none w-fit flex flex-col gap-2">
                          <div>
                            <img
                                className="object-cover rounded-md bg-white shadow-lg"
                                src={user?.avatar}
                                width={60}
                                height={60} 
                                alt="user"
                            />
                          </div>
                          <div className={`w-fit px-4 py-0 rounded-md text-xs lg:text-sm text-white ${user?.is_naughty ? 'bg-red-600 ' : 'bg-blue-600'}`}>
                            {user?.is_naughty ? 'Naughty' : 'Nice'}
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col gap-2">
                          <div>
                            <div>{user?.first_name} {user?.last_name}</div>
                            <div>{user?.email}</div>
                          </div>
                          <div className="flex flex-row gap-4">
                            <div className="w-fit"><ActionButton name="Details" action={redirectAction.bind(null,`/user/${user?.remote_id}`)}/></div>
  
                          </div>
                        </div>
        
                      </div>
                  </li>
                  );
                })
              }
        
          </ul>

          <div className="flex flex-row justify-start divide-x divide-green-800">
                
                {Number.isNaN(parseInt(page)) || parseInt(page) < 2 
                  ? null 
                  : <div className="w-fit pr-4"><ActionButton name="Previous Page" action={redirectAction.bind(null,`/users/${Number.isNaN(parseInt(page)) || parseInt(page) < 2 ? 1 : parseInt(page) - 1}`)}/></div>
                }
                {
                  usersList?.length 
                  ? <div className={`w-fit ${Number.isNaN(parseInt(page)) || parseInt(page) < 2 ? 'px-0' : 'px-4'}`}><ActionButton name="Next Page" action={redirectAction.bind(null,`/users/${Number.isNaN(parseInt(page)) || parseInt(page) < 1 ? 1 : parseInt(page) + 1}`)}/></div>
                  : null
                }
                
          </div>


        </div>  

    </div>
  );
}

 