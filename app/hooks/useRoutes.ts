import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";

const useRoutes = () => {
  const pathname = usePathname()
  const { conversationId } = useConversation()

  const routes = useMemo(() => [
    {
      label: "Chat",
      href: "/conversations",
      icon: "x",
      active: pathname === "/conversations" || !!conversationId
    },
    {
      label: "Users",
      href: "/users",
      icon: "x",
      active: pathname === "/users"
    },
    {
      label: "Logout",
      href: "#",
      onClick: () => signOut(),
      icon: "x"
    }
  ], [pathname, conversationId])

  return routes
}

export default useRoutes



