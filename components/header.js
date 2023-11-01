import Link from "next/link"
import { useSession } from "next-auth/react"
import UserDropdown from "./user-dropdown";

export default function Header( props ) {

  const userdata = useSession();
  console.log(userdata)
  
  return (
  <>
    <header className="text-gray-600 body-font b-b-[1px] b-black bg-black-100">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="w-10 h-10 text-white p-2 bg-red-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="ml-3 text-xl">{props.sitedata.data.name}</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/" className="mr-5 hover:text-gray-900">Home</Link>
          <Link href="/blog" className="mr-5 hover:text-gray-900">Blog</Link>

          

          { userdata?.data && userdata?.status == "authenticated" ? (
            <>
              <UserDropdown/>
            </>
              ) : <Link href="/login" className="mr-5 hover:text-gray-900">Login</Link>
          }
          
        </nav>
      </div>
    </header>
  </>
  )
}
