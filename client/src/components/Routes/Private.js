import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      if (auth?.user?.role !== 0) {
        return navigate("/dashboard/admin");
      }
      // continue to check
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/auth/user-auth`,
          {
            headers: {
              Authorization: auth?.token,
            },
          }
        );
        setOk(res.data.ok);
      } catch (err) {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token, auth?.user]);
  return ok ? <Outlet /> : <Spinner />;
}
