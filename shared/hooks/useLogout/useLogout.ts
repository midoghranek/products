import { logoutUser, useAppDispatch } from "@store";
import { removeCookies } from "cookies-next";
import { useRouter } from "next/router";

const useLogout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const logout = () => {
    removeCookies("session");
    localStorage.removeItem("user");
    dispatch(logoutUser());
    router.push("/login");
  };
  return logout;
};

export default useLogout;
