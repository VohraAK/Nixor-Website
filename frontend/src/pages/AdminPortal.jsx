import { useState } from "react";

export default function AdminPortal() {
  const [pageLoading, setPageLoading] = useState(true);

  setTimeout(() => {
    setPageLoading(false);
  }, 850);

  return (
    <div className="font-inter">
      <h1 className="text-3xl font-semibold p-10 text-center text-slate-700 border-b-[2px]">
        {pageLoading ? "Loading...  " : "Admin Portal"}
      </h1>
      {pageLoading ? (
        ""
      ) : (
        <div className="flex-col space-y-10">
          <div className="border text-2xl border-slate-800 border-opacity-50 shadow-sm rounded-2xl p-10 m-10 hover:shadow">
            <h1 className="text-slate-700">New Applicants</h1>
          </div>
          <div className="border text-2xl border-slate-800 border-opacity-50 shadow-sm rounded-2xl p-10 m-10 hover:shadow">
            <h1 className="text-slate-700">All Students</h1>
          </div>
        </div>
      )}
    </div>
  );
}
