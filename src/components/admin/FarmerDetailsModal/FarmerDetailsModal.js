/** @format */

import { memo } from "react";
import axios from "../../../helpers/axios";
import { MdCheck, MdClose } from "react-icons/md";
import styles from "./FarmerDetailsModal.module.css";

export default memo(function FarmerDetailsModal({ setShowDetailsModal, farmer, fetchFarmers }) {
  async function changeFarmerStatus(status) {
    try {
      const response = await axios.post(`/seller/change-status/${farmer._id}`, {
        status,
        email: farmer.email,
      });
      if (response.status === 200) {
        fetchFarmers();
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={() => setShowDetailsModal(false)}>
          <MdClose />
        </button>
        <h2>Farmer Details</h2>
        <img src={farmer.profileImage} alt={farmer.name} width={100} />
        <p>
          <b>Full Name:</b>&nbsp;{farmer.name}
        </p>
        <p>
          <b>Email:</b>&nbsp;{farmer.email}
        </p>
        <p>
          <b>Phone Number:</b>&nbsp;{farmer.phoneNumber}
        </p>
        <p>
          <b>Street Address:</b>&nbsp;{farmer.address}
        </p>
        <p>
          <b>City:</b>&nbsp;{farmer.city}
        </p>
        <p>
          <b>Pincode:</b>&nbsp;{farmer.pincode}
        </p>
        <p>
          <b>State:</b>&nbsp;{farmer.state}
        </p>
        <p>
          <b>Status:</b>&nbsp;{farmer.status}
        </p>
        {farmer.status === "Pending" && (
          <div className={styles.buttonContainer}>
            <button onClick={() => changeFarmerStatus("Approved")}>
              <MdCheck fontSize={20} />
              &nbsp;Approve
            </button>
            <button onClick={() => changeFarmerStatus("Disapproved")}>
              <MdClose fontSize={20} />
              &nbsp;Disapprove
            </button>
          </div>
        )}
      </div>
    </div>
  );
});
