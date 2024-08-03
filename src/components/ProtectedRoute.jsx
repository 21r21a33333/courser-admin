import { useEffect } from "react";
import Cookies from "js-cookie";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = Cookies.get("AdminToken");
    if (jwtToken === undefined) {
      navigate("/login", { replace: true });
    }
  });

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;