const initialState = {
  userName: "",
  email: "",
  status: "",
  role: "",
  createdAt: "",
  updatedAt: "",
  token:"",
};

const UserReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_USER": {
      return { ...state, ...payload };
    }
    case "REMOVE_USER": {
      return { ...initialState }
    }
    default:
      return state;
  }
};

export default UserReducer;
