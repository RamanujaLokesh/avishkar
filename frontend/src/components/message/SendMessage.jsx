// SendMessage.jsx

import React, { useState } from 'react';
import { socket } from '../../socket';
import { useAuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const SendMessage = ({ addMessage }) => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Ensure `value` and `authUser` are defined and available
    if (!value || !authUser) {
      toast.error('Message or user information is missing.');
      setLoading(false);
      return;
    }

    socket.emit('sendMessage', {
      text: value,
      sender_regno: authUser.reg_no,
      hostel_name: authUser.hostel,
      timestamp: new Date().toISOString()
    }, (acknowledgment) => {
      setLoading(false);
      if (acknowledgment.status === 'ok' && acknowledgment.message?.unique_id) {
        // Call addMessage to update the messages in ConferenceRoom
        addMessage(acknowledgment.message);
        setValue('');
        // toast.success('Message sent successfully!');
      } else {
        toast.error('Failed to send message.');
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-row'>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Type your message"
        disabled={loading}
        className='w-4/5 text-center'
      />
      <button type='submit' disabled={loading} className='w-1/5 btn-primary btn'>
        {loading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}

export default SendMessage;
