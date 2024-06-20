import { Link, useNavigate } from 'react-router-dom';
import LogoRed from '../assets/NixorSharkOutlineNormal.png';
import { useState } from 'react';

export default function SignIn() {

	const [formData, setFormData] = useState({});
	const [submitLoading, setSubmitLoading] = useState(false);
	const [submitError, setSubmitError] = useState(null);

	const navigate = useNavigate();

	console.log(formData);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setSubmitLoading(true);
		setSubmitError(false);

		try 
		{
			// call signin endpoint
			const response = await fetch('/api/auth/signin', 
			{
				method: "POST",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData)
			});

			const data = await response.json();

			// check success
			if (data.success === false)
			{
				setSubmitError(data.message);
				setSubmitLoading(false);
				return;
			}

			setSubmitError(null);
			setSubmitLoading(false);
			navigate('/');

		} 
		catch (error) 
		{
			setSubmitError(error.message);
			setSubmitLoading(false);
		}
	};



  return (
    <div className='p-12 flex flex-col gap-10 font-inter'>
        <div className='flex flex-col items-center'>
            <img src={LogoRed} className='h-20 w-20 object-contain'/>
            <h1 className="font-semibold text-xl">Sign in to your account</h1>
        </div>
        <div className='w-full m-auto'>
            <div className='bg-white p-12 rounded-lg border shadow-sm sm:max-w-[580px] mx-auto'>
                <form onSubmit={handleFormSubmit} className='flex flex-col gap-8'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="">Username</label>
                        <input type="text" id='username' onChange={handleChange} className='border rounded-md p-2' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="">Password</label>
                        <input type="password" id='password' onChange={handleChange} className='border rounded-md p-2' />
                    </div>
                    <button type="submit" disabled={submitLoading} className='bg-red-700 text-white p-2 rounded-lg disabled:opacity-80'>
											{submitLoading ? 'Signing in...' : "Sign in"}
										</button>
                    <div className='text-light'>
                        <span>No account? <Link to={'/sign-up'} className='text-blue-600 hover:underline'>Create an account</Link></span>
                    </div>
                </form>
								{submitError ? <h1 className='text-red-700 text-sm mt-5'>{submitError}</h1> : ''}
            </div>
        </div>
    </div>
  )
}
