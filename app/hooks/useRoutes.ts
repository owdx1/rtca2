import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiChat, HiUser } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";
import axios from "axios";
import { StatusType } from "../types";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const handleSignOut = async () => {
    const status: StatusType = "offline"
    signOut();
    axios.post("/api/users/statusUpdate" , { status })
    .then((response) => {
      console.log("status is updated", response.data)         
    })
    .catch((e) => {
      console.log("status didnt update")
    })
    .finally(() => {
      console.log("finally")
    })
  }

  const routes = useMemo(() => [
    {
      label: "Chat",
      href: "/conversations",
      icon: HiChat,
      active: pathname === "/conversations" || !!conversationId
    },
    {
      label: "Users",
      href: "/users",
      icon: HiUser,
      active: pathname === "/users"
    },
    {
      label: "Logout",
      href: "#",
      onClick: () => handleSignOut(),
      icon: HiArrowLeftOnRectangle
    }
  ], [pathname, conversationId])

  return routes
}

export default useRoutes



