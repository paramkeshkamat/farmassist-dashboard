/** @format */

import { useEffect, useState } from "react";
import axios from "../helpers/axios";
import MessagesTable from "../components/admin/MessagesTable/MessagesTable";

export default function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const { data } = await axios.get("/api/contactus");
        setMessages(data);
      } catch (err) {
        console.log(err.messages);
      }
    }
    fetchMessages();
  }, []);

  return (
    <div>
      <h2>Messages</h2>
      <MessagesTable messages={messages} />
    </div>
  );
}
