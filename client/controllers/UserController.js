import axios from "axios";

const registerUser = async (username, password, confirmPass, name) => {
  if (!username || !password || !confirmPass || !name) {
    throw Error("All fields are required");
  }

  if (confirmPass != password) {
    throw Error("Confirm password do not match to password");
  }
  try {
    const res = await axios.post("/books/users/register", {
      username,
      password,
      name,
    });
  } catch (error) {
    throw Error(error);
  }
};
const loginUser = async (username, password) => {
  if (!username || !password) {
    throw Error("All fields are required");
  }

  try {
    const res = await axios.post("/books/users/login", {
      username,
      password,
    });
    localStorage.setItem("username", res.data.user.username);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("name", res.data.user.user_name);
  } catch (error) {
    throw Error(error);
  }
};

export { registerUser, loginUser };
