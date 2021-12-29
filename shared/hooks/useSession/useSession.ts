import { setUser } from "@store";
import { User } from "@types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useSession = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setUser(JSON.parse(localStorage.getItem("user") as string) as User)
    );
  }, [dispatch]);
};

export default useSession;
