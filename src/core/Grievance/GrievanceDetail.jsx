// src/grievance/GrievanceDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMessages, sendMessage } from "../../services/grievanceService";

const GrievanceDetail = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadMessages = async () => {
      const messagesData = await fetchMessages(id, navigate);
      setMessages(messagesData || []);
    };
    loadMessages();
  }, [id, navigate]);

  const handleSendMessage = async () => {
    if (!newMessage) return;
    const message = await sendMessage(id, newMessage, navigate);
    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <div>
      <h2>Détails de la Doléance</h2>
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <strong>{message.user.name}:</strong> {message.content_message}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Votre message"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Envoyer</button>
    </div>
  );
};

export default GrievanceDetail;
