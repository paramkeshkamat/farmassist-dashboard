/** @format */

import { useContext, useEffect, useState } from "react";
import UserApproval from "../components/admin/UserApproval/UserApproval";
import PieChart from "../components/sellers/Analytics/PieChart";
import Profits from "../components/sellers/Analytics/Profits";
import LineChart from "../components/sellers/Analytics/LineChart";
import { AuthContext } from "../context/authContext";
import axios from "../helpers/axios";
import styles from "../styles/home.module.css";

export default function Home() {
  const [user, setUser] = useState({});
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const { data } = await axios.get("/single-seller", {
          headers: {
            authorization: `Bearer ${currentUser.token}`,
          },
        });
        setUser(data);
      } catch (err) {
        console.log(err.message);
      }
    }
    if (currentUser.token) {
      fetchProfileData();
    }
  }, [currentUser.token]);

  return (
    <div className={styles.homeContainer}>
      {currentUser.role === "admin" && <UserApproval />}
      {currentUser.role === "seller" && (
        <div>
          <h2 style={{ marginBottom: 30 }}>Welcome, {user.name}!</h2>
          <div className={styles.chartContainer}></div>
          <div className={styles.group}>
            <Profits />
            <PieChart />
          </div>
          <div className={styles.group}>
            <LineChart />
            <Profits />
          </div>
        </div>
      )}
    </div>
  );
}
