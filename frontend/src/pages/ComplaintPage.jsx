import React from 'react';
import ComplaintForm from '../components/complaintForm.jsx';  
import ComplaintList from '../components/complaintList.jsx';  
import Navbar from '../components/navbar.jsx';
import Footer from '../components/footer.jsx';

const ComplaintsPage = () => {
    return (
        <div>

        <div className="min-h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-pink-100 py-12 px-4">
            <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-lg p-8">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                    <span className="text-indigo-600">Complaint</span> Portal
                </h1>

                <section className="mb-10">
                    <h2 className="text-2xl font-medium text-gray-700 mb-5">
                        Submit a New Complaint
                    </h2>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                        <ComplaintForm />
                    </div>
                </section>

                
                <section>
                    <h2 className="text-2xl font-medium text-gray-700 mb-5">Your Complaints</h2>
                    <div className="overflow-hidden rounded-lg shadow-md bg-white">
                        <ComplaintList />
                    </div>
                </section>
            </div>
        </div>
        
        </div>
    );
};

export default ComplaintsPage;
