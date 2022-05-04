/** @format */

import { memo } from "react";
import FarmerRow from "./FarmerRow";
import styles from "./FarmerTable.module.css";

export default memo(function FarmerTable({ farmers, fetchFarmers }) {
  return (
    <div className={styles.farmertableContainer}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {farmers.length === 0 ? (
            <tr className={styles.noRequests}>
              <td colSpan={4}>Currently no requests here!</td>
            </tr>
          ) : (
            farmers.map((farmer) => (
              <FarmerRow key={farmer._id} farmer={farmer} fetchFarmers={fetchFarmers} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
});
