/** @format */

import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Header from "../components/global/Header/Header";
import Sidebar from "../components/global/Sidebar/Sidebar";
import Login from "../pages/login";
import Home from "../pages";
import Messages from "../pages/messages";
import Products from "../pages/products";
import News from "../pages/news";
import Profile from "../pages/profile";
import ErrorPage from "../pages/errorpage";

export default function Router() {
  const { currentUser } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {currentUser ? (
        <div style={{ marginLeft: 280, padding: "10px 40px" }}>
          <Sidebar />
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/messages" element={<Messages />} />
            <Route exact path="/products" element={<Products />} />
            <Route exact path="/news" element={<News />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/login" element={<Navigate to="/" />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route exact path="/" element={<Navigate to="/login" />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}
