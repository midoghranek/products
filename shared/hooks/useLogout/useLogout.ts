import { logoutUser } from "@store";
import { removeCookies } from "cookies-next";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const useLogout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const logout = () => {
    removeCookies("session");
    removeCookies("user_role");
    localStorage.removeItem("user");
    dispatch(logoutUser());
    router.push("/login");
  };
  return logout;
};

export default useLogout;
