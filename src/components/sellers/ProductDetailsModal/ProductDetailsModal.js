/** @format */

import { memo } from "react";
import { MdClose } from "react-icons/md";
import styles from "./ProductDetailsModal.module.css";

export default memo(function ProductDetailsModal({ setShowDetailsModal, product }) {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={() => setShowDetailsModal(false)}>
          <MdClose />
        </button>
        <h2>Product Details</h2>
        <img src={product.productImage} alt={product.productName} />
        <p>
          <b>Name:</b>&nbsp;{product.productName}
        </p>
        <p>
          <b>Description:</b>&nbsp;{product.productDescription}
        </p>
        <p>
          <b>Category:</b>&nbsp;{product.productCategory}
        </p>
        <p>
          <b>Quantity:</b>&nbsp;{product.quantity}
        </p>
        <p>
          <b>Price:</b>&nbsp;₹{product.productPrice} per {product.measurement}
        </p>
      </div>
    </div>
  );
});
