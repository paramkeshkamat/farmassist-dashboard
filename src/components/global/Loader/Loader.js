/** @format */

import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles["lds-ring"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
