import getUsers from "../action/getUsers";
import { Sidebar } from "../components/sidebar/Sidebar";
import UserList from "./components/UserList";



export default async function UsersLayout ({ children } : Readonly<{children: React.ReactNode}>) {

  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <UserList users={users}/>
        {children}
      </div>
    </Sidebar>
  )
}