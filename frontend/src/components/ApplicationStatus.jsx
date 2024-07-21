// eslint-disable-next-line react/prop-types
export default function ApplicationStatus({applicationStatus}) {
  return (
    <div className="border border-red-800 shadow-md border-opacity-10 rounded-lg p-5 justify-between flex">
        <div className="text-slate-800 font-inter font-bold text-xl">Application Status</div>
        <div className="font-inter font-semibold text-lg">
            {applicationStatus === 'Accepted' ? (<span className="text-green-800">Accepted</span>) : applicationStatus === 'Pending' ? (<span>Pending</span>) : applicationStatus === 'Rejected' ? (<span className="text-red-800">Rejected</span>) : ''}
        </div>
    </div>
  )
}
