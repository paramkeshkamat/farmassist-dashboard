/** @format */

import { memo } from "react";
import ProductRow from "./ProductRow";
import styles from "./ProductsTable.module.css";

export default memo(function ProductsTable({ products, fetchProducts }) {
  return (
    <div className={styles.producttableContainer}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr className={styles.noProducts}>
              <td colSpan={5}>You haven't added any products yet!</td>
            </tr>
          ) : (
            products.map((product) => (
              <ProductRow key={product._id} product={product} fetchProducts={fetchProducts} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
});
