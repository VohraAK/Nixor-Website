import { Link } from "react-router-dom";
import LogoWhite from '../assets/NixorSharkOutlineWhite.png'
import { useSelector } from "react-redux";

export default function Header() {

  const { currentUser } = useSelector((state) => state.user)

  return (
    <header className="w-full font-inter">
        <div className="flex items-center bg-red-800 justify-between p-3.5 md:p-3 shadow-md text-slate-100 text-xs sm:text-lg">
            <Link to={'/'}>
                <img src={LogoWhite} className='h-12 w-20 object-contain select-none'/>
            </Link>
            <ul className='flex gap-6'>
              <Link to={'/about'}><li className="hover:cursor-pointer hover:underline text-center">About Us</li></Link>
              <Link to={'/academics'}><li className="hover:cursor-pointer hover:underline text-center">Academics</li></Link>
              <Link to={'/ecas'}><li className="hover:cursor-pointer hover:underline text-center">ECAs</li></Link>
              <Link to={'https://www.nixorcorporate.com'}><li className="hover:cursor-pointer hover:underline text-center">Nixor Corporate</li></Link>
            </ul>
            <ul className="flex gap-5">
              <li className="hover:cursor-pointer hover:underline text-center">
                {/* add profile avatar when available */}
                {currentUser ? (<Link to={'/profile'}>View Profile</Link>) : (<Link to={'/sign-in'}>Sign in</Link>)}
              </li>
            </ul>
        </div>
    </header>
  )

}
