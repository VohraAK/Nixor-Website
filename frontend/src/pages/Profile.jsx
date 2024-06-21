import { useDispatch, useSelector } from 'react-redux';
import LogoRed from '../assets/NixorSharkOutlineNormal.png';
import { useNavigate } from 'react-router-dom';
import { signOutStart, signOutSuccess, signOutFaliure } from '../redux/user/userSlice';

export default function UserDetails() {

	const { currentUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSignOut = async () => {
		
		try 
		{
			dispatch(signOutStart());

			const response = await fetch('/api/auth/signout');
			const data = await response.json();

			if (data.success === false) 
			{
				dispatch(signOutFaliure(data.message));
				return;
			}
			dispatch(signOutSuccess());
			navigate('/sign-in');
		} 
		catch (error) { dispatch(signOutFaliure(error.message)) }
	};

  return (
    <div className='p-12 flex flex-col gap-10 font-inter'>
        <div className='flex flex-col items-center'>
            <img src={LogoRed} className='h-20 w-20 object-contain'/>
            <h1 className="font-semibold text-xl">Hello {currentUser.firstName || currentUser.username}</h1>
        </div>
        <div className='w-full m-auto'>
            <div className='bg-white p-12 rounded-lg border shadow-sm sm:max-w-[580px] mx-auto'>
                <form className='flex flex-col gap-8'>
                    <p className='text-center'>ADD IMAGE HERE</p>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="">First Name</label>
                        <input type="text" id='firstName' className='border rounded-md p-2' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="">Last Name</label>
                        <input type="text" id='lastName' className='border rounded-md p-2' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="">Date of Birth</label>
                        <input type="date" id='DOB' className='border rounded-md p-2' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="">Permanent Address</label>
                        <input type="text" id='address' className='border rounded-md p-2' />
                    </div>
                    <button type="submit" className='bg-red-700 text-white p-2 rounded-lg'>Update Profile</button>
                </form>
                <button onClick={handleSignOut} className='text-red-700 mt-10 hover:underline'>Sign out</button>
            </div>
        </div>
    </div>
  )
}
