// eslint-disable-next-line react/prop-types
export default function ApplicationStatus({ applicationStatus }) {
  return (
    <div className="border border-red-800 shadow-md border-opacity-10 rounded-lg p-6 justify-between flex flex-col gap-8">
      <div className="flex justify-between">
        <div className="text-slate-800 font-inter font-bold text-xl">
          Application Status
        </div>
        <div className="font-inter font-semibold text-lg">
          {applicationStatus === "Accepted" ? (
            <span className="text-green-800">Accepted</span>
          ) : applicationStatus === "Pending" ? (
            <span>Pending</span>
          ) : applicationStatus === "Rejected" ? (
            <span className="text-red-800">Rejected</span>
          ) : (
            ""
          )}
        </div>
      </div>
      {applicationStatus === "Accepted" ? (
        <button className="text-white bg-red-800 w-full font-semibold text-lg hover:opacity-80 shadow-md rounded-lg p-2 mx-auto">
          Enroll in Nixor College
        </button>
      ) : null}
      {/* Add student-conversion functionality on-click */}
    </div>
  );
}
