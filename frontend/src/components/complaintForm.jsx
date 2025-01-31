import React, { useState } from 'react';
import { toast } from 'react-hot-toast'; 
const ComplaintForm = () => {
    const [complaint, setComplaint] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch('api/complaints/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ complaint }),
                
            });

            if (response.ok) {
                toast.success('Complaint added successfully!');
                setComplaint('');
            } else {
                throw new Error('Failed to add complaint');
            }
        } catch (err) {
            toast.error(err.message || 'Failed to add complaint');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                className="textarea textarea-bordered w-full h-32 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your complaint"
                required
            ></textarea>
            <button
                type="submit"
                className={`btn btn-primary w-full ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
            </button>
        </form>
    );
};

export default ComplaintForm;
