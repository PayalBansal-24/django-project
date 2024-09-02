import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Success from "../../public/success.png"; // Replace with the path to your success image

const EditWork = () => {
  const [workId, setWorkId] = useState(null);
  const [workDetails, setWorkDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    const storedWorkId = localStorage.getItem('workId');
    if (storedWorkId) {
      setWorkId(storedWorkId);
    } else {
      console.error('No workId found in localStorage');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (workId) {
      const fetchWorkDetails = async () => {
        try {
          const response = await axios.get(`/api/userwork/${workId}`);
          if (response.status === 200) {
            setWorkDetails(response.data.response.work_data);
          } else {
            console.error('Failed to fetch work details');
          }
        } catch (error) {
          console.error('Error fetching work details:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchWorkDetails();
    }
  }, [workId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/api/editwork/${workId}`, workDetails);
      if (response.status === 200) {
        setShowSuccessModal(true); // Show success modal on successful update
        setTimeout(() => {
          setShowSuccessModal(false); // Hide modal after 2 seconds
          navigate('/dashboard?tab=work'); // Redirect after hiding modal
        }, 2000);
      } else {
        console.error('Failed to update work entry');
      }
    } catch (error) {
      console.error('Error updating work entry:', error);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard?tab=work');
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate('/dashboard?tab=work'); // Redirect after closing modal
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row text-sm">
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-full bg-[#f9f9fa]">
        <Header />
        <div className="w-full">
          <div className="p-5 mt-5 rounded-md">
            <form className="flex flex-col gap-5" onSubmit={handleUpdate}>
              <div>
                <label className="block mb-2 font-medium">Work Description</label>
                <textarea
                  className="p-3 bg-white text-black rounded-md mb-4 border-2 border-gray-300 w-full"
                  value={workDetails.workdescription || ''}
                  onChange={(e) =>
                    setWorkDetails({ ...workDetails, workdescription: e.target.value })
                  }
                  rows="6"
                ></textarea>
              </div>
              <div className="flex gap-4">
                <button
                  className="px-3 py-2 bg-[#FB923C] rounded-sm border-none text-white cursor-pointer text-sm font-semibold"
                  type="submit"
                >
                  Update
                </button>
                <button
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-sm border-none text-white cursor-pointer text-sm font-semibold"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
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
              Work Updated Successfully!
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

export default EditWork;
