const authInitial = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  user: null,
  loading: true,
  error: null,
};

export default authInitial;
