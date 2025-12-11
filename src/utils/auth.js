export const isLoggedIn = () => {
  const token = localStorage.getItem("accessToken");
  return token ? true : false;
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  window.location.href = "/login";
};
