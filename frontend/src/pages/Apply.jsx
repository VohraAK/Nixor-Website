import { useState } from "react";
import { useSelector } from "react-redux"

export default function Apply() {

	const grades = ['A*', 'A', 'B', 'C', 'D', 'E', 'U'];
	const compulsorySubjectsList = ['English Language', 'Islamiyat', 'Mathematics', 'Pakistan Studies', 'Urdu']
	const electiveSubjectsList = ['Accounting', 'Additional Mathematics', 'Arabic', 'Biology', 'Business Studies','Chemistry', 'Computer Science', 'Economics', 'Enviromental Management', 'Physics', 'Sociology', 'Urdu']

	const [subjectGrades, setSubjectGrades] = useState({});

	const { currentUser } = useSelector((state) => state.user);

	console.log(subjectGrades);

	
	const handleGradeChange = (subject, grade) => {
		setSubjectGrades({ ...subjectGrades, [subject]: grade });
	};

  return (
    <div className="flex flex-col font-inter">
        <h1 className="text-3xl p-10">Hello <span className="text-red-700 font-bold">{currentUser.firstName || currentUser.username}</span>, start your application!</h1>
				<div className='w-full border border-t-2 border-b-0 flex p-10 sm:p-12'>
					<div className="flex gap-10 flex-wrap w-full">

						<div className="flex flex-col flex-wrap border border-slate-300 rounded-xl shadow-sm p-8 w-full sm:w-[750px] mx-auto">

							<div className="flex flex-col items-center gap-5">

							<div className="flex items-center gap-6 w-full p-2">
								<span className="text-red-700 font-semibold text-4xl">1</span>
								<span className="text-2xl font-semibold">Personal Information</span>
							</div>

							<div className="flex flex-col w-full sm:w-[600px]">
								<label htmlFor="" className="pl-2 pb-1">Full Name</label>
								<input type="text" className="rounded-md p-2 border" />
							</div>

							<div className="flex flex-col w-full sm:w-[600px]">
								<label htmlFor="" className="pl-2 pb-1">Citizen ID</label>
								<input type="text" className="rounded-md p-2 border" />
							</div>

							<div className="flex flex-col w-full sm:w-[600px]">
								<label htmlFor="" className="pl-2 pb-1">Mobile Number (03XX-)</label>
								<input type="tel" className="rounded-md p-2 border"/>
							</div>

							<div className="flex flex-col w-full sm:w-[600px]">
								<label htmlFor="" className="pl-2 pb-1">Permanent Address</label>
								<input type="text" className="rounded-md p-2 border"/>
							</div>
							
							<div className="flex flex-col w-full sm:w-[600px]">
								<label htmlFor="" className="pl-2 pb-1">Mother Name</label>
								<input type="text" className="rounded-md p-2 border"/>
							</div>

							<div className="flex flex-col w-full sm:w-[600px]">
								<label htmlFor="" className="pl-2 pb-1">Father Name</label>
								<input type="text" className="rounded-md p-2 border"/>
							</div>
						</div>

						</div>

						<div className="flex flex-col gap-8 flex-wrap border border-slate-300 rounded-xl shadow-sm p-8 w-full sm:w-[750px] mx-auto">

							<div className="flex flex-col items-center gap-5">

							<div className="flex items-center gap-6 w-full p-2">
								<span className="text-red-700 font-semibold text-4xl">2</span>
								<span className="text-2xl font-semibold">School Information</span>
							</div>

							<div className="flex flex-col w-full sm:w-[600px]">
								<label htmlFor="" className="pl-2">School Name</label>
								<input type="text" className="rounded-md p-2 border" />
							</div>

							<div className="flex flex-col w-full sm:w-[600px]">
								<label htmlFor="" className="pl-2 pb-1">Educational System</label>
								<select defaultValue={'OL'} className="border rounded-md p-2">
									<option value={'OL'}>Cambridge O-Level</option>
									<option value={'Matric'}>Matriculation</option>
								</select>
							</div>
							</div>
						</div>

						<div className="flex flex-col gap-8 flex-wrap border border-slate-300 rounded-xl shadow-sm p-8 w-full sm:w-[750px] mx-auto">	

							<div className="flex flex-col items-center gap-5">

							<div className="flex items-center gap-6 w-full p-2">
							<span className="text-red-700 font-semibold text-4xl">3</span>
								<span className="text-2xl font-semibold">Academic Grades</span>
							</div>
							
							<div className="flex flex-col w-full sm:w-[600px]">

								<label htmlFor="" className="pl-2 pb-2 font-semibold">Compulsory Subjects</label>

								<div className="w-full flex flex-col gap-2">

									<div className="flex flex-col w-full sm:w-[600px] gap-3">
										{compulsorySubjectsList.map((subject) => (
											<div key={subject} className="flex justify-between">

												<div className="w-8/12 border rounded-md p-2 bg-white border-slate-300">
													{subject}
												</div>

												<select className="w-3/12 sm:w-2/12 border rounded-md p-2 border-slate-300" value={subjectGrades[subject] || ''} onChange={(e) => handleGradeChange(subject, e.target.value)}>
													<option value="default">-</option>
													{grades.map((grade) => (
														<option key={grade} value={grade}>{grade}</option>
													))}
												</select>
											</div>
										))}
									</div>
								</div>
								<label htmlFor="" className="pl-2 pt-10 pb-2 font-semibold">Elective Subjects</label>
								<div className="w-full flex flex-col gap-2">
								<div className="flex flex-col w-full sm:w-[600px] gap-3">
										{electiveSubjectsList.map((subject) => (
											<div key={subject} className="flex justify-between">

												<div className="w-8/12 border rounded-md p-2 bg-white border-slate-300">
													{subject}
												</div>

												<select className="w-3/12 sm:w-2/12 border rounded-md p-2 border-slate-300 " value={subjectGrades[subject] || ''} onChange={(e) => handleGradeChange(subject, e.target.value)}>
													<option value="default">-</option>
													{grades.map((grade) => (
														<option key={grade} value={grade}>{grade}</option>
													))}
												</select>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
						</div>
					</div>
				</div>
    </div>
  )
}




