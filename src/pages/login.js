/** @format */

import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "../helpers/axios";
import styles from "../styles/login.module.css";

const emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,5}$");

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      if (!email || !password) {
        setErrorMessage("All fields are required!");
      } else if (!emailRegex.test(email)) {
        setErrorMessage("Please enter a valid email!");
      } else {
        if (email === "admin@farmassist.com" && password === "admin@123") {
          const updateduser = {
            email: "admin@farmassist.com",
            username: "admin",
            role: "admin",
          };
          setCurrentUser(updateduser);
          localStorage.setItem("currentUser", JSON.stringify(updateduser));
          navigate("/");
        } else {
          const { data } = await axios.post("/seller/login", { email, password });
          const updateduser = {
            token: data.accessToken,
            role: "seller",
          };
          setCurrentUser(updateduser);
          localStorage.setItem("currentUser", JSON.stringify(updateduser));
        }
      }
    } catch (err) {
      if (err.response.status === 401) {
        setErrorMessage(err.response.data.error.message);
      }
      console.log(err.message);
    }
  }

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.titleName}>
        farm<span>Assist</span>
      </h2>
      <div className={styles.leftContainer}>
        <form onSubmit={handleLogin}>
          <h2>Sign in to Account</h2>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type={`${showPassword ? "text" : "password"}`}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className={styles.rememberMe}>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <span>Show password</span>
          </label>
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
          <button type="submit">Sign in</button>
        </form>
      </div>
      <div className={styles.rightContainer}></div>
    </div>
  );
}
