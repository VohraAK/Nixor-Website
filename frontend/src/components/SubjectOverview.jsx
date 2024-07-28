/* eslint-disable react/prop-types */
export default function SubjectOverview({ subject }) {
  // props = name, midterm, final, grade
  return (
    <div className="font-inter flex-col items-center border border-red-800 border-opacity-40 shadow-md rounded-xl p-3 bg-white sm:min-w-[380px] min-w-full">
      <div className="flex justify-center border-b-2">
        <h1 className="text-2xl font-semibold text-nowrap py-2 mb-2">
          {subject.name}
        </h1>
      </div>
      <div className="flex gap-5 justify-center py-2">
        <div>
          <h1 className="text-lg font-semibold">Midterm</h1>
          <h1 className="text-2xl font-semibold text-center">
            {subject.midterm || "-"}
          </h1>
        </div>
        <div>
          <h1 className="text-lg font-semibold">Final</h1>
          <h1 className="text-2xl font-semibold text-center">
            {subject.final || "-"}
          </h1>
        </div>
        <div>
          <h1 className="text-lg font-semibold">Grade</h1>
          <h1 className="text-2xl font-semibold text-red-800 text-center">
            {subject.grade || "-"}
          </h1>
        </div>
      </div>
    </div>
  );
}
