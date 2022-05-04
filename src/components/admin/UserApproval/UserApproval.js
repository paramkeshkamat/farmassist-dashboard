/** @format */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import axios from "../../../helpers/axios";
import FarmerTable from "../FarmerTable/FarmerTable";
import styles from "./UserApproval.module.css";

export default function UserApproval() {
  const [selectedTab, setSelectedTab] = useState(1);
  const [farmers, setFarmers] = useState([]);

  async function fetchFarmers() {
    try {
      let bodyObj = {};
      if (selectedTab === 1) {
        bodyObj.status = "Pending";
      } else if (selectedTab === 2) {
        bodyObj.status = "Approved";
      } else if (selectedTab === 3) {
        bodyObj.status = "Disapproved";
      }
      const { data } = await axios.post("/seller", bodyObj);
      setFarmers(data);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchFarmers();
  }, [selectedTab]);

  return (
    <div>
      <h2 className={styles.title}>Approvals</h2>
      <div className={styles.tabs}>
        <p
          onClick={() => setSelectedTab(1)}
          className={`${selectedTab === 1 ? styles.active : null}`}
        >
          Pending Approvals
        </p>
        <p
          onClick={() => setSelectedTab(2)}
          className={`${selectedTab === 2 ? styles.active : null}`}
        >
          Approved Farmers
        </p>
        <p
          onClick={() => setSelectedTab(3)}
          className={`${selectedTab === 3 ? styles.active : null}`}
        >
          Disapproved Farmers
        </p>
      </div>
      <FarmerTable farmers={farmers} fetchFarmers={fetchFarmers} />
    </div>
  );
}
