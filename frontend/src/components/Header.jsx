import { Link } from "react-router-dom";
import LogoWhite from '../assets/NixorSharkOutlineWhite.png'

export default function Header() {
  return (
    <header className="w-full font-inter">
        <div className="flex items-center bg-red-800 justify-between p-3.5 md:p-3 shadow-md text-slate-100 text-xs sm:text-lg">
            <Link to={'/'}>
                <img src={LogoWhite} className='h-12 w-20 object-contain select-none'/>
            </Link>
            <div className='flex gap-6'>
              <Link to={'/about'}>About Us</Link>
              <Link to={'/academics'}>Academics</Link>
              <Link to={'/ecas'}>ECAs</Link>
              <Link to={'https://www.nixorcorporate.com'}>Nixor Corporate</Link>
            </div>
            <div className='flex gap-6'>
              <Link to={'/sign-in'}>Sign In</Link>
            </div>
        </div>
    </header>
  )

}
