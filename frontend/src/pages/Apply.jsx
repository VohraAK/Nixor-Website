import { useState } from "react";
import { useSelector } from "react-redux"

export default function Apply() {

	const grades = ['A*', 'A', 'B', 'C', 'D', 'E', 'U'];
	const compulsorySubjectsList = ['English Language', 'Islamiyat', 'Mathematics', 'Pakistan Studies', 'Urdu']
	const electiveSubjectsList = ['Accounting', 'Additional Mathematics', 'Arabic', 'Biology', 'Business Studies','Chemistry', 'Computer Science', 'Economics', 'Enviromental Management', 'Physics', 'Sociology', 'Urdu']
	const [subjects, setSubjects] = useState({ subject: '', grade: '' })
	const { currentUser } = useSelector((state) => state.user);

	// load saved application details here

  return (
    <div className="flex flex-col font-inter">
        <h1 className="text-3xl p-10">Hello <span className="text-red-700 font-bold">{currentUser.firstName || currentUser.username}</span>, start your application!</h1>
				<div className='w-full border border-t-2 border-b-0 flex p-10 sm:p-12'>
					<div className="flex gap-10 flex-wrap w-full">

						<div className="flex flex-col gap-8 flex-wrap border rounded-xl shadow-sm p-10 w-full sm:w-[700px] mx-auto">	
							<div className="flex items-center gap-6 w-full">
								<div className="flex justify-center items-center bg-red-700 h-12 w-12 rounded-full">
									<span className="text-white text-4xl">1</span>
								</div>
								<span className="text-2xl">Personal Information</span>
							</div>
							<div className="flex flex-col w-full sm:w-[600px]">
								<label htmlFor="" className="pl-2">Full Name</label>
								<input type="text" className="rounded-md p-2 border" />
							</div>
							<div className="flex flex-col w-full sm:w-[600px]">
								<label htmlFor="" className="pl-2">Citizen ID</label>
								<input type="text" className="rounded-md p-2 border" />
							</div>
							<div className="flex flex-col w-full sm:w-[600px]">
								<label htmlFor="" className="pl-2">Mobile Number (03XX-)</label>
								<input type="tel" className="rounded-md p-2 border"/>
							</div>
							<div className="flex flex-col w-full sm:w-[600px]">
								<label htmlFor="" className="pl-2">Permanent Address</label>
								<input type="text" className="round mx-autoed-md p-2 border" value={currentUser.address}/>
							</div>
							<div className="flex flex-col w-full sm:w-[600px]">
								<label htmlFor="" className="pl-2">Mother Name</label>
								<input type="text" className="rounded-md p-2 border"/>
							</div>
							<div className="flex flex-col w-full sm:w-[600px]">
								<label htmlFor="" className="pl-2">Father Name</label>
								<input type="text" className="rounded-md p-2 border"/>
							</div>
						</div>

						<div className="flex flex-col gap-8 flex-wrap border rounded-xl shadow-sm p-10 w-full sm:w-[700px] mx-auto">	
							<div className="flex items-center gap-6 w-full">
								<div className="flex justify-center items-center bg-red-700 h-12 w-12 rounded-full">
									<span className="text-white text-4xl">2</span>
								</div>
								<span className="text-2xl">Academic Information</span>
							</div>
							<div className="flex flex-col w-full sm:w-[600px]">
								<label htmlFor="" className="pl-2">School Name</label>
								<input type="text" className="rounded-md p-2 border" />
							</div>
							<div className="flex flex-col w-full sm:w-[600px]">
								<label htmlFor="" className="pl-2">Educational System</label>
								<select defaultValue={'OL'} className="border rounded-md p-2">
									<option value={'OL'}>Cambridge O-Level</option>
									<option value={'Matric'}>Matriculation</option>
								</select>
							</div>
							<div className="flex flex-col w-full sm:w-[600px]">
								<label htmlFor="" className="pl-2">Grades</label>
								{}
							</div>
						</div>
					</div>
				</div>
    </div>
  )
}




