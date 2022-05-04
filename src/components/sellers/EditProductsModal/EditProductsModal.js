/** @format */

import { useState, useContext, memo } from "react";
import { AuthContext } from "../../../context/authContext";
import axios from "../../../helpers/axios";
import { storage } from "../../../utils/firebase";
import { MdClose } from "react-icons/md";
import Loader from "../../global/Loader/Loader";
import styles from "./EditProductsModal.module.css";

export default memo(function EditProductsModal({ setShowEditModal, product, fetchProducts }) {
  const [name, setName] = useState(product.productName);
  const [description, setDescription] = useState(product.productDescription);
  const [category, setCategory] = useState(product.productCategory);
  const [quantity, setQuantity] = useState(product.quantity);
  const [price, setPrice] = useState(product.productPrice);
  const [measurement, setMeasurement] = useState(product.measurement);
  const [productImage, setProductImage] = useState("");
  const [image, setImage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const { currentUser } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);
    if (!name) {
      setErrorMessage("Product Name is required!");
      setIsLoading(false);
    } else if (!description) {
      setErrorMessage("Product Description is required!");
      setIsLoading(false);
    } else if (!quantity) {
      setErrorMessage("Please Add Quantity!");
      setIsLoading(false);
    } else if (!price) {
      setErrorMessage("Please Add Product Price!");
      setIsLoading(false);
    } else if (!productImage) {
      setErrorMessage("Please Add Product Image");
      setIsLoading(false);
    } else {
      if (image) {
        const uploadTask = storage.ref(`products/${image.name}`).put(image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // eslint-disable-next-line no-unused-vars
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            // console.log(progress);
          },
          (err) => console.log(err.message),
          () => {
            storage
              .ref("products")
              .child(image.name)
              .getDownloadURL()
              .then((url) => {
                axios
                  .post(
                    "/api/products",
                    {
                      productName: name,
                      productDescription: description,
                      productCategory: category,
                      productPrice: parseInt(price),
                      quantity: parseInt(quantity),
                      measurement,
                      productImage: url,
                    },
                    {
                      headers: {
                        authorization: `Bearer ${currentUser.token}`,
                      },
                    },
                  )
                  .then(() => {
                    setShowEditModal(false);
                    fetchProducts();
                    setIsLoading(false);
                  })
                  .catch((err) => {
                    console.log(err.message);
                    setIsLoading(false);
                  });
              })
              .catch((err) => {
                console.log(err.message);
                setIsLoading(false);
              });
          },
        );
      }
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.modalContainer}>
        <div className={styles.modal}>
          <button className={styles.closeButton} onClick={() => setShowEditModal(false)}>
            <MdClose />
          </button>
          <h2>Edit Product</h2>
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
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </>
  );
});
