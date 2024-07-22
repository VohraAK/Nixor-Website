import { useSelector } from "react-redux";
import { Outlet, Navigate } from 'react-router-dom';

export default function UserRoute() {
    const { currentUser } = useSelector((state) => state.user);
    // render child route elements if user is logged in
    return (currentUser && (currentUser.userType === 'user' || currentUser.userType === 'admin' || currentUser.userType === 'student') ? <Outlet /> : <Navigate to='/sign-in'/>);
}
