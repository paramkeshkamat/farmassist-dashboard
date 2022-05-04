/** @format */
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useContext } from "react";
import AddProductsModal from "../components/sellers/AddProductsModal/AddProductsModal";
import ProductsTable from "../components/sellers/ProductsTable/ProductsTable";
import { AuthContext } from "../context/authContext";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "../helpers/axios";
import styles from "../styles/products.module.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const { currentUser } = useContext(AuthContext);

  async function fetchProducts() {
    try {
      const { data } = await axios.get("/api/sellers-products", {
        headers: {
          authorization: `Bearer ${currentUser.token}`,
        },
      });
      setProducts(data);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    if (currentUser.token) {
      fetchProducts();
    }
  }, [currentUser.token]);

  return (
    <>
      {showAddProductModal && (
        <AddProductsModal
          setShowAddProductModal={setShowAddProductModal}
          fetchProducts={fetchProducts}
        />
      )}
      <div>
        <h2 className={styles.title}>Your Products</h2>
        <button className={styles.addButton} onClick={() => setShowAddProductModal(true)}>
          <AiOutlinePlus fontSize={22} />
          &nbsp;&nbsp;Add New Product
        </button>
        <ProductsTable products={products} fetchProducts={fetchProducts} />
      </div>
    </>
  );
}
