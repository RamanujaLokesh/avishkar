import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Message = ({ message , onDelete }) => {
  const { authUser } = useAuthContext();

  // console.log(message, "in each message");
  const reg_no = message.sender_regno; // Use sender_regno from message object
  const isSender = authUser.reg_no === reg_no;
   const handleDelete = async () => {
    
    try {
       const res = await fetch(`/api/message/delete/${message.unique_id}`,
         { method: 'DELETE', }
        );
         if (!res.ok) { 
          throw new Error('Failed to delete message');
         } toast.success('Message deleted successfully');
          onDelete(message.unique_id); 
        }
         catch (error)
          {
             toast.error(error.message);
           }
          }
        

  return (
    <div className={"chat " + (isSender ? "chat-end" : "chat-start")}>
      <div className="chat-header">
        <span className='text-gray-600'>{reg_no}</span> {isSender&&<span className='pl-1 hover:text-red-900' onClick={handleDelete}>delete</span>}
      </div>
      <div className="chat-bubble text-white">{message.text}</div>
        <time className="text-xs opacity-50">{new Date(message.timestamp).toLocaleTimeString()}</time>
    </div>
  );
};

export default Message;
