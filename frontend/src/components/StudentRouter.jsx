import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function StudentRoute() {
  const { currentUser } = useSelector((state) => state.user);
  // render child route elements if user is logged in
  return currentUser && currentUser.userType === "student" ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" />
  );
}
