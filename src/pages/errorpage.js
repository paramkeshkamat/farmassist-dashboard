/** @format */

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import styles from "../styles/errorPage.module.css";

export default function ErrorPage() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={styles.errorPageContainer}>
      <img src="/illustrations/404.png" alt="404 page not found" width={500} />
      {currentUser ? (
        <button onClick={() => navigate("/")}>Home Page</button>
      ) : (
        <button onClick={() => navigate("/login")}>Login Page</button>
      )}
    </div>
  );
}
