/** @format */

import { useState, useContext, memo } from "react";
import { MdClose } from "react-icons/md";
import { AuthContext } from "../../../context/authContext";
import { BsFillCheckCircleFill } from "react-icons/bs";
import styles from "./ChangePasswordModal.module.css";
import axios from "../../../helpers/axios";

export default memo(function ChangePasswordModal({ setShowChangePasswordModal }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const { currentUser } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (newPassword.length < 6) {
        setErrorMessage("Password should be minimum of 6 letters!");
      } else if (newPassword !== confirmNewPassword) {
        setErrorMessage("Both password do not match!");
      } else {
        const response = await axios.post(
          "/seller/change-password",
          { password: newPassword },
          {
            headers: {
              authorization: `Bearer ${currentUser.token}`,
            },
          },
        );
        if (response.status === 200) {
          setSuccess(true);
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={() => setShowChangePasswordModal(false)}>
          <MdClose />
        </button>
        {success ? (
          <div className={styles.success}>
            <BsFillCheckCircleFill fontSize={60} color="#408858" />
            <p>Your password has been changed successfully!</p>
          </div>
        ) : (
          <>
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
              {errorMessage && <p className="errorMessage">{errorMessage}</p>}
              <button type="submit">Change</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
});
