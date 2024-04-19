import classNames from "classnames"
import Link from "next/link"

interface MobileItemProps {
  label: string,
  icon: any
  href: string
  onClick?: () => void
  active?: boolean
}

const MobileItem: React.FC<MobileItemProps> = ({label, icon: Icon, href, onClick, active}) => {

  const handleClick = () => {
    if(onClick) return onClick()
  }

  return (
    <Link 
      href={href} 
      onClick={handleClick}
      className={classNames({
        "group flex gap-x-3 text-sm leading-6 font-extralight w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100": true,
        "bg-gray-100 text-black": active
      })}
    >
      <Icon className="h-6 w-6"/>
    </Link>
  )
}

export default MobileItem