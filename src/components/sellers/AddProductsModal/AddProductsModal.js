/** @format */

import { useState, useContext, memo } from "react";
import { MdClose } from "react-icons/md";
import { AuthContext } from "../../../context/authContext";
import { storage } from "../../../utils/firebase";
import styles from "./AddProductsModal.module.css";

export default memo(function AddProductsModal({ setShowAddProductModal }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("vegetables");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [measurement, setMeasurement] = useState("");
  const [productImage, setProductImage] = useState("");
  const [image, setImage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const { currentUser } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!name) {
        setErrorMessage("Product Name is required!");
      } else if (!description) {
        setErrorMessage("Product Description is required!");
      } else if (!quantity) {
        setErrorMessage("Please Add Quantity!");
      } else if (!price) {
        setErrorMessage("Please Add Product Price!");
      } else if (!productImage) {
        setErrorMessage("Please Add Product Image");
      } else {
        if (image) {
          const uploadTask = storage.ref(`products/${image.name}`).put(image);
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={() => setShowAddProductModal(false)}>
          <MdClose />
        </button>
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
            <option value="grains">Grains</option>
            <option value="pulses">Pulses</option>
            <option value="dairy">Dairy</option>
            <option value="others">Others</option>
          </select>
          <input
            type="number"
            placeholder="Product Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <div className={styles.group}>
            <input
              type="text"
              placeholder="Product Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <select value={measurement} onChange={(e) => setMeasurement(e.target.value)}>
              <option value="kg">kg</option>
              <option value="litre">litre</option>
              <option value="dozen">dozen</option>
            </select>
          </div>
          <input
            type="file"
            accept="image/*"
            placeholder="Product Image"
            value={productImage}
            onChange={(e) => {
              setProductImage(e.target.value);
              if (e.target.files[0]) {
                setImage(e.target.files[0]);
              }
            }}
          />
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
});
