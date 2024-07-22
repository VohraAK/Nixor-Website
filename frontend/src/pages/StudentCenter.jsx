import { useSelector } from 'react-redux';

export default function StudentCenter() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
      <div className='border shadow'>
        <h1 className="text-4xl p-10">
          Welcome{" "}
          <span className="text-red-700 font-bold">
            {currentUser.fullName}
          </span>
        </h1>
      </div>
    </div>
  )
}
