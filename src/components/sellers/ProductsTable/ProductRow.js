/** @format */

import { useState } from "react";
import ProductDetailsModal from "../ProductDetailsModal/ProductDetailsModal";

export default function FarmerRow({ product, fetchProducts }) {
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  return (
    <>
      {showDetailsModal && (
        <ProductDetailsModal
          setShowDetailsModal={setShowDetailsModal}
          product={product}
          fetchProducts={fetchProducts}
        />
      )}
      <tr onClick={() => setShowDetailsModal(true)}>
        <td>{product.productName}</td>
        <td>{product.productCategory}</td>
        <td>{product.quantity}</td>
        <td>
          ₹{product.productPrice} per {product.measurement}
        </td>
      </tr>
    </>
  );
}
