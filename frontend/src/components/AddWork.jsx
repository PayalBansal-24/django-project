import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Success from "../../public/success.png";

const AddWork = () => {
  const [workDescription, setWorkDescription] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const personId = localStorage.getItem('person_id');
    const personName = localStorage.getItem('Employee Name');

    try {
      const response = await axios.post('/api/addwork', {
        person: personId,
        name: personName,
        workdescription: workDescription,
      });

      if (response.status === 201) {
        setWorkDescription('');
        setShowSuccessModal(true); // Show success modal
      } else {
        alert(response.data.error.errorMessage);
      }
    } catch (error) {
      alert('An error occurred while adding work');
    }
  };

  // Function to handle modal close
  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate('/dashboard?tab=work'); // Navigate after closing the modal
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-full bg-[#f9f9fa]">
        <Header />
        <div className="p-2 rounded-md mt-2">
          <form className="flex flex-col gap-5 p-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="font-medium text-md">Work Description</label>
              <textarea
                className="p-3 bg-white text-black rounded-md mb-4 border-2 focus:border-orange-400 w-full mt-2"
                rows="6"
                value={workDescription}
                onChange={(e) => setWorkDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="flex justify-start">
              <button
                type="submit"
                className="px-4 py-2 bg-orange-400 hover:bg-orange-500 rounded-sm text-white font-semibold h-9 text-sm"
              >
                Submit
              </button>
              <Link to="/dashboard?tab=work">
                <button
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-sm ml-3 text-white h-9 text-sm"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 p-5">
          <div className="bg-white p-4 sm:p-2 rounded-lg shadow-lg w-full sm:w-[25%]">
            <div className="flex items-center justify-center mb-2">
              <img src={Success} alt="Success" className="h-20 sm:h-20" />
            </div>
            <h3 className="mb-4 font-semibold text-sm text-center">
              Work Added Successfully!
            </h3>
            <div className="flex justify-center">
              <button
                className="px-8 py-1 bg-green-700 rounded-md text-white text-sm font-semibold"
                onClick={handleModalClose}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddWork;
