/** @format */

import { memo } from "react";
import { months } from "../../../utils/months";
import styles from "./MessagesTable.module.css";

function formatDateString(date) {
  const now = new Date(date);

  return `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}, ${
    (now.getHours() % 12) + 1 < 9 ? `0${(now.getHours() % 12) + 1}` : (now.getHours() % 12) + 1
  }:${
    (now.getMinutes() % 12) + 1 > 9
      ? (now.getMinutes() % 12) + 1
      : `0${(now.getMinutes() % 12) + 1}`
  } ${now.getHours() > 11 ? "PM" : "AM"}`;
}

export default memo(function MessagesTable({ messages }) {
  return (
    <div className={styles.messagesContainer}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Messages</th>
            <th>Sent At</th>
          </tr>
        </thead>
        <tbody>
          {messages.length === 0 ? (
            <tr className={styles.noMessages}>
              <td colSpan={4}>Currently no requests here!</td>
            </tr>
          ) : (
            messages.map((message) => (
              <tr key={message._id}>
                <td>{message.name}</td>
                <td>{message.email}</td>
                <td>{message.message}</td>
                <td>{formatDateString(message.timestamp)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
});
