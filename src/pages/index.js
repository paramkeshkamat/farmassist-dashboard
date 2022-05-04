/** @format */

import { useContext } from "react";
import UserApproval from "../components/admin/UserApproval/UserApproval";
import { AuthContext } from "../context/authContext";
import styles from "../styles/home.module.css";

export default function Home() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={styles.homeContainer}>{currentUser.role === "admin" && <UserApproval />}</div>
  );
}
