import React, { useEffect, useState, useRef } from "react";
import { socket } from "../socket";
import Message from "../components/message/Message";
import SendMessage from "../components/message/SendMessage";
import useGetMessages from "../hooks/useGetMessages";
import { useAuthContext } from "../context/AuthContext";
import SelectHostel from "../components/SelectHostel";

const ConferenceRoom = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const { loading, getMessages } = useGetMessages();
  const { authUser } = useAuthContext();
  const [hostel, setHostel] = useState(authUser.hostel);
  
  const messagesEndRef = useRef(null); 
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); 

  useEffect(() => {
    const fetchMessages = async () => {
      if (hostel !== "All") {
        const data = await getMessages(hostel);
        if (Array.isArray(data)) {
          const sortedMessages = data.sort(
            (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
          );
          setMessages(sortedMessages);
        } else {
          console.error("Data fetched is not an array", data);
        }
      }
    };
    fetchMessages();
  }, [hostel]);

  useEffect(() => {
    if (hostel !== "All") {
      setIsConnected(socket.connected);

      const onConnect = () => {
        setIsConnected(true);
        socket.emit("joinHostel", hostel);  // Emit only when socket connects
      };
      const onDisconnect = () => setIsConnected(false);
      const onReceiveMessage = (message) => {
        setMessages((prevMessages) => {
          // Ensure no duplicates and sort messages
          const messageExists = prevMessages.some(
            (msg) => msg.unique_id === message.unique_id
          );
          if (!messageExists) {
            const updatedMessages = [...prevMessages, message].sort(
              (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
            );
            return updatedMessages;
          }
          return prevMessages;
        });
      };

      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);
      socket.on("receiveMessage", onReceiveMessage);

      return () => {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
        socket.off("receiveMessage", onReceiveMessage);
      };
    }
  }, [hostel]);

  const handleDeleteMessage = async (id) => {
    if (!id) {
      console.error("No unique_id found for message deletion");
      return;
    }
    try {
      socket.emit("deleteMessage", id, hostel);
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.unique_id !== id)
      );
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const onSelectHostel = (hostelValue) => {
    setHostel(hostelValue);
    setMessages([]); 
  };

  const addMessage = (newMessage) => {
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, newMessage];
      return updatedMessages.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {hostel === "All" ? (
        <div className="h-full">
          <SelectHostel onSelectHostel={onSelectHostel} />
        </div>
      ) : (
        <>
        {authUser.auth_level===3&&<SelectHostel onSelectHostel={onSelectHostel}/>}
          <div className="flex flex-col flex-grow overflow-hidden">
            <div className="flex-grow overflow-y-auto p-4">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <span className="loading loading-spinner"></span>
                </div>
              ) : messages.length > 0 ? (
                messages.map((message) => (
                  <Message
                    key={message.unique_id}
                    message={message}
                    onDelete={handleDeleteMessage}
                  />
                ))
              ) : (
                <div className="text-center text-gray-500">
                  No messages found.
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
          {isConnected ? (
            <div className="bg-white shadow-md p-4 sticky bottom-0">
              <SendMessage addMessage={addMessage} />
            </div>
          ) : (
            <div className="text-center text-red-500 p-4">
              Connection error. Please try again.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ConferenceRoom;
