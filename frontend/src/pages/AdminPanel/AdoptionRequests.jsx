import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaEye, FaInfoCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AdoptionRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showFormDetails, setShowFormDetails] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdoptionRequests();
  }, []);

  const fetchAdoptionRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/adoption/requests');
      // console.log('Adoption Requests Response:', response.data); // Debug log
      
      // Transform the data to include pet details
      const requestsWithPetDetails = await Promise.all(
        response.data.requests.map(async (request) => {
          try {
            // Get the pet ID from the request object
            const petId = request.petId._id || request.petId;
            // console.log('Pet ID:', petId); // Debug log
            
            // Fetch pet details for each request
            const petResponse = await axios.get(`http://localhost:8080/api/pets/${petId}`);
            // console.log('Pet Response for ID', petId, ':', petResponse.data); // Debug log
            return {
              ...request,
              petDetails: petResponse.data
            };
          } catch (err) {
            console.error('Error fetching pet details:', err);
            return {
              ...request,
              petDetails: null
            };
          }
        })
      );
      // console.log('Final Requests with pet details:', requestsWithPetDetails); // Debug log
      setRequests(requestsWithPetDetails);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch adoption requests');
      toast.error('Failed to fetch adoption requests');
    } finally {
      setLoading(false);
    }
  };

  const handleViewFormDetails = (request) => {
    setSelectedRequest(request);
    setShowFormDetails(true);
  };

  const handleCloseFormDetails = () => {
    setShowFormDetails(false);
    setSelectedRequest(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        <p>Loading adoption requests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
        <p>{error}</p>
        <button 
          onClick={fetchAdoptionRequests}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {requests.map((request) => (
          <motion.div
            key={request._id}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative h-48 overflow-hidden group">
              <img 
                src={request.petDetails?.images?.[0]?.path 
                  ? `http://localhost:8080/Pet/${request.petDetails.images[0].path}`
                  : request.petDetails?.type?.toLowerCase() === 'dog' 
                    ? '/assets/demo-dog.jpg' 
                    : '/assets/demo-cat.jpg'
                } 
                alt={request.petDetails?.name || 'Pet'}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = request.petDetails?.type?.toLowerCase() === 'dog' 
                    ? '/assets/demo-dog.jpg' 
                    : '/assets/demo-cat.jpg';
                }}
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-white text-xl font-semibold">
                    {request.petDetails?.name || 'Pet Name'}
                  </h3>
                  <p className="text-white/80 text-sm mt-1">
                    {request.petDetails?.breed || request.petDetails?.type || 'Pet'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border-t">
              <h3 className="text-lg font-medium">{request.fullName}</h3>
              <div className="flex space-x-4">
                <Link to={`/petDescription/${request.petDetails?._id}`}>
                <button 
                  className="flex items-center gap-2 bg-[#3e623e] text-white py-2 px-4 rounded-lg hover:bg-[#1e2d1e] transition-colors"
                >
                  <FaEye /> Pet
                </button></Link>
                <button 
                  onClick={() => handleViewFormDetails(request)}
                  className="flex items-center gap-2 bg-[#518fa7] text-white py-2 px-4 rounded-lg hover:bg-[#345b6b] transition-colors"
                >
                  <FaInfoCircle /> Adopter
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {showFormDetails && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[70vh] overflow-y-auto relative">
            <button 
              onClick={handleCloseFormDetails}
              className="absolute top-4 right-4 z-50 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              style={{ transform: 'translateY(-50%, 50%)' }}
            >
              <span className="text-2xl text-gray-600 hover:text-gray-800">&times;</span>
            </button>

            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
              <h2 className="text-3xl font-bold mb-2">Adoption Application</h2>
              <p className="text-white/90 text-sm">
                Submitted on {new Date(selectedRequest.createdAt).toLocaleString()}
              </p>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Row 1: Personal Info and Household Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Personal Information */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-blue-600 mb-4">Personal Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Full Name:</span>
                      <span className="font-medium text-gray-800">{selectedRequest.fullName}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium text-gray-800">{selectedRequest.email}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium text-gray-800">{selectedRequest.phone}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Government ID:</span>
                      <span className="font-medium text-gray-800">{selectedRequest.govtId}</span>
                    </div>
                  </div>
                </div>

                {/* Household Information */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-blue-600 mb-4">Household Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Time at Home:</span>
                      <span className="font-medium text-gray-800">{selectedRequest.timeAtHome}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Total Members:</span>
                      <span className="font-medium text-gray-800">{selectedRequest.totalMembers}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Has Children:</span>
                      <span className="font-medium text-gray-800">{selectedRequest.hasChildren ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">All Agree:</span>
                      <span className="font-medium text-gray-800">{selectedRequest.allAgree ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Address Info and Living Situation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Address Information */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-blue-600 mb-4">Address Details</h3>
                  <div className="space-y-3">
                    <div className="border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Street Address:</span>
                      <div className="font-medium text-gray-800 mt-1">{selectedRequest.streetAddress}</div>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Apartment:</span>
                      <span className="font-medium text-gray-800">{selectedRequest.apartment}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">City:</span>
                      <span className="font-medium text-gray-800">{selectedRequest.city}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">State:</span>
                      <span className="font-medium text-gray-800">{selectedRequest.state}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Country:</span>
                      <span className="font-medium text-gray-800">{selectedRequest.country}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Zipcode:</span>
                      <span className="font-medium text-gray-800">{selectedRequest.zipcode}</span>
                    </div>
                  </div>
                </div>

                {/* Living Situation */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-blue-600 mb-4">Living Situation</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Residence Type:</span>
                      <span className="font-medium text-gray-800">{selectedRequest.residenceType}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Housing Status:</span>
                      <span className="font-medium text-gray-800">{selectedRequest.housingStatus}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Space Size:</span>
                      <span className="font-medium text-gray-800">{selectedRequest.spaceSize}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Has Yard:</span>
                      <span className="font-medium text-gray-800">{selectedRequest.hasYard ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Has Fence:</span>
                      <span className="font-medium text-gray-800">{selectedRequest.hasFence}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Neighborhood:</span>
                      <span className="font-medium text-gray-800">{selectedRequest.neighborhoodType}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: Pet Experience and Adoption Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pet Experience */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-blue-600 mb-4">Pet Experience</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Had Pets Before:</span>
                      <span className="font-medium text-gray-800">{selectedRequest.hadPetsBefore ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Currently Has Pets:</span>
                      <span className="font-medium text-gray-800">{selectedRequest.currentlyHasPets ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Pet Care Knowledge:</span>
                      <span className="font-medium text-gray-800">{selectedRequest.petCareKnowledge}</span>
                    </div>
                  </div>
                </div>

                {/* Adoption Reason */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-blue-600 mb-4">Adoption Reason</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">{selectedRequest.adoptionReason}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdoptionRequests;
