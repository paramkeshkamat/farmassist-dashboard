/** @format */

import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import { FaPenAlt, FaUserAlt } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { ImNewspaper } from "react-icons/im";
import { AiTwotoneShop, AiFillHome } from "react-icons/ai";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>
        farm<span>Assist</span>
      </h2>
      <div className={styles.links}>
        {currentUser.role === "admin" && (
          <>
            <Link to="/">
              <FaPenAlt fontSize={23} />
              &nbsp;Approvals
            </Link>
            <Link to="/messages">
              <MdMessage fontSize={26} />
              Messages
            </Link>
          </>
        )}
        {currentUser.role === "seller" && (
          <>
            <Link to="/">
              <AiFillHome fontSize={23} />
              &nbsp;Home
            </Link>
            <Link to="/products">
              <AiTwotoneShop fontSize={26} />
              Products
            </Link>
            <Link to="/news">
              <ImNewspaper fontSize={27} />
              News
            </Link>
            <Link to="/profile">
              <FaUserAlt fontSize={26} />
              Profile
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
