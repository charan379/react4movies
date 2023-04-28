import { useDispatch, useSelector } from "react-redux";
import { removeUser, setUser } from "store/actions/UserActions";

const useAuth = () => {
  const dispatch = useDispatch();
  return {
    removeAuth: () => dispatch(removeUser()),
    setAuth: (userDetails) => dispatch(setUser({ ...userDetails })),
    auth: useSelector((state) => state.UserReducer),
  };
};

export { useAuth };
