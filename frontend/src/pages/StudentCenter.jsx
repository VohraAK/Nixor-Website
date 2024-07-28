import { useSelector } from "react-redux";
import SubjectOverview from '../components/SubjectOverview.jsx';
export default function StudentCenter() {
  const { currentUser } = useSelector((state) => state.user);
  const subjectA = { name: "Physics", midterm: 83, final: 81, grade: "A" };
  const subjectB = { name: "Chemistry", midterm: 72, final: 83, grade: "A" };
  const subjectC = { name: "Mathematics", midterm: 65, final: 58, grade: "B" };
  const subjectD = { name: "Computer Science", midterm: 45, final: 62, grade: "C" };
  const ecaArray = ["Footballer", "Treasurer"];
  return (
    <div>
      <div className="border shadow">
        <h1 className="text-4xl p-10">
          Welcome{" "}
          <span className="text-red-700 font-bold">{currentUser.fullName}</span>
        </h1>
      </div>
      <div>
        <h1 className="text-2xl p-10 font-semibold">Academic Journey</h1>
        <div className="px-7 flex gap-5 flex-wrap">
          <SubjectOverview subject={subjectA}/>
          <SubjectOverview subject={subjectB}/>
          <SubjectOverview subject={subjectC}/>
          <SubjectOverview subject={subjectD}/>
        </div>
        <h1 className="text-2xl px-10 py-6 font-semibold mt-5">Extracurricular Activities:</h1>
        <div className="px-9 flex gap-8">
          {ecaArray.map((eca) => (
            <div key={eca} className="border bg-white rounded-xl p-4 border-red-800 border-opacity-40">
              <h1 className="font-semibold text-xl">{eca}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
