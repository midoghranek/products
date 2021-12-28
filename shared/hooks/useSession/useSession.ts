import { logoutUser, setUser, useAppDispatch } from "@store";
import { User } from "@types";
import { useEffect } from "react";

const useSession = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setUser(JSON.parse(localStorage.getItem("user") as string) as User)
    );
  }, [dispatch]);
};

export default useSession;
