import Link from 'next/link'

const NavMenuItem = ({menuName, menuHref}) => {
  
  return (
    <li>
      <Link href={`${menuHref}`} className="flex items-center space-x-3 text-xl rounded-md bg-transparent px-3 py-2 hover:bg-gray-600 hover:font-semibold ">
        <span>{menuName}</span>
      </Link>
    </li>
  )
}

export default NavMenuItem