import { useSelector } from "react-redux";
import SubjectOverview from "../components/SubjectOverview.jsx";
import { useEffect, useState } from "react";
export default function StudentCenter() {
  const { currentUser } = useSelector((state) => state.user);
  const [student, setStudent] = useState(null);
  const [studentError, setStudentError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getStudent = async () => {
      try {
        setStudent(null);
        setStudentError(false);
        const response = await fetch(`/api/student/${currentUser._id}`);
        const data = await response.json();
        if (data.success === false) {
          setStudent(null);
          setStudentError(data.message);
          return;
        }

        setStudent(data);
        setStudentError(null);
        setIsLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        setStudent(null);
        setStudentError(error.message);
        setIsLoading(false); // Set loading state to false in case of error
      }
    };

    getStudent();
  }, [currentUser._id]);

  return (
    <div className="w-full">
      {isLoading || studentError ? (
        <div className="border shadow">
          <h1 className="text-4xl p-10 text-center text-red-700 font-bold">
            {studentError || "Loading..."}
          </h1>
        </div>
      ) : (
        <>
          <div className="border shadow">
            <h1 className="text-4xl p-10 text-center">
              Welcome{" "}
              <span className="text-red-700 font-bold">
                {currentUser.fullName}
              </span>
            </h1>
          </div>
          <div>
            <h1 className="text-2xl p-10 font-semibold text-center">
              Academic Journey
            </h1>
            <div className="px-7 flex gap-5 flex-wrap">
              {student &&
                student.subjectGrades.map((subject) => (
                  <SubjectOverview key={subject._id} subject={subject} />
                ))}
            </div>
            <h1 className="text-2xl px-10 py-6 font-semibold mt-5 text-center">
              Extracurricular Activities:
            </h1>
            <div className="px-7 flex gap-5 flex-wrap justify-center">
              {student &&
                student.ECAs.map((eca) => (
                  <div
                    key={eca._id}
                    className="font-semibold text-lg p-4 border rounded-xl bg-white border-red-800 border-opacity-50"
                  >
                    <h1>{eca}</h1>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
