/** @format */

import { useState, useEffect, useContext } from "react";
import ChangePasswordModal from "../components/sellers/ChangePasswordModal/ChangePasswordModal";
import { AuthContext } from "../context/authContext";
import axios from "../helpers/axios";
import styles from "../styles/profile.module.css";

export default function Profile() {
  const [profileData, setProfileData] = useState({});
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const { data } = await axios.get("/single-seller", {
          headers: {
            authorization: `Bearer ${currentUser.token}`,
          },
        });
        setProfileData(data);
      } catch (err) {
        console.log(err.message);
      }
    }
    if (currentUser.token) {
      fetchProfileData();
    }
  }, [currentUser.token]);

  return (
    <>
      {showChangePasswordModal && (
        <ChangePasswordModal setShowChangePasswordModal={setShowChangePasswordModal} />
      )}

      <div className={styles.profileContainer}>
        <h2>Profile</h2>
        <div className={styles.profileDetails}>
          <div className={styles.leftContainer}>
            <img src={profileData.profileImage} alt={profileData.name} />
            <button
              className={styles.changeButton}
              onClick={() => setShowChangePasswordModal(true)}
            >
              Change Password
            </button>
          </div>
          <div className={styles.rightContainer}>
            <p>
              <b>Full Name:</b>&nbsp;{profileData.name}
            </p>
            <p>
              <b>Email:</b>&nbsp;{profileData.email}
            </p>
            <p>
              <b>Phone Number:</b>&nbsp;{profileData.phoneNumber}
            </p>
            <p>
              <b>Street Address:</b>&nbsp;{profileData.address}
            </p>
            <p>
              <b>City:</b>&nbsp;{profileData.city}
            </p>
            <p>
              <b>Pincode:</b>&nbsp;{profileData.pincode}
            </p>
            <p>
              <b>State:</b>&nbsp;{profileData.state}
            </p>
            <p>
              <b>Status:</b>&nbsp;{profileData.status}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
