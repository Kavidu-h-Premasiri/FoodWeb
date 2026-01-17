export const isAuthenticated = () => {
  // Check if user is logged in
  return localStorage.getItem("token") ? true : false;
};

export const isAdmin = () => {
  // Check if admin is logged in
  return localStorage.getItem("adminToken") ? true : false;
};
