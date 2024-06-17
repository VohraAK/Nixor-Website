import { Link } from "react-router-dom";
import LogoWhite from '../assets/NixorSharkOutlineWhite.png'

export default function Header() {
  return (
    <header>
        <div className="flex items-center justify-between bg-red-800 p-3.5 md:p-3 shadow-md text-slate-100">
            <Link to={'/'}>
                <img src={LogoWhite} className='h-12 w-20 object-contain'/>
            </Link>
            <div className='flex gap-10'>
              <h1>Link</h1>
              <h1>Link</h1>
              <h1>Link</h1>
            </div>
            <div className='flex gap-'>
              <Link to={'/sign-in'}>Sign In</Link>
              <h1>Link</h1>
              <h1>Link</h1>
            </div>
        </div>
    </header>
  )

}
