/** @format */

import { useContext, useState } from "react";
import { AuthContext } from "../../../context/authContext";
import axios from "../../../helpers/axios";
import ProductDetailsModal from "../ProductDetailsModal/ProductDetailsModal";
import styles from "./ProductsTable.module.css";

export default function FarmerRow({ product, fetchProducts }) {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const { currentUser } = useContext(AuthContext);

  async function handleDelete() {
    try {
      const response = await axios.delete(`/api/products/${product._id}`, {
        headers: {
          authorization: `Bearer ${currentUser.token}`,
        },
      });
      if (response.status === 200) {
        fetchProducts();
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <>
      {showDetailsModal && (
        <ProductDetailsModal
          setShowDetailsModal={setShowDetailsModal}
          product={product}
          fetchProducts={fetchProducts}
        />
      )}
      <tr>
        <td onClick={() => setShowDetailsModal(true)}>{product.productName}</td>
        <td onClick={() => setShowDetailsModal(true)}>{product.productCategory}</td>
        <td onClick={() => setShowDetailsModal(true)}>{product.quantity}</td>
        <td onClick={() => setShowDetailsModal(true)}>
          ₹{product.productPrice} per {product.measurement}
        </td>
        <td>
          <button className={styles.deleteButton} onClick={handleDelete}>
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}
