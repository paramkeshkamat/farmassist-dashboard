/** @format */

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import { MdLogout } from "react-icons/md";
import styles from "./Header.module.css";

export default function Header() {
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    navigate("/login");
  }

  return (
    <div className={styles.headerContainer}>
      <button onClick={handleLogout}>
        Logout&nbsp;&nbsp;
        <MdLogout fontSize={20} />
      </button>
    </div>
  );
}
