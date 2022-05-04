/** @format */

import { useState } from "react";
import FarmerDetailsModal from "../FarmerDetailsModal/FarmerDetailsModal";

export default function FarmerRow({ farmer, fetchFarmers }) {
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  return (
    <>
      {showDetailsModal && (
        <FarmerDetailsModal
          setShowDetailsModal={setShowDetailsModal}
          farmer={farmer}
          fetchFarmers={fetchFarmers}
        />
      )}
      <tr onClick={() => setShowDetailsModal(true)}>
        <td>{farmer.name}</td>
        <td>{farmer.email}</td>
        <td>{farmer.phoneNumber}</td>
        <td>{farmer.status}</td>
      </tr>
    </>
  );
}
