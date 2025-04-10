import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Pets = () => {
  const [allPets, setAllPets] = useState([]);
  const [pendingPets, setPendingPets] = useState([]);
  const [showAllPets, setShowAllPets] = useState(true); // State to toggle between All Pets and Pending Requests
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
  // Fetch Pets Data
  const fetchPetsData = async () => {
    try {
      // const response = await axios.get("http://localhost:8080/api/Admin/allPets");
      const response = await axios.get("http://localhost:8080/api/Admin/allPets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const allPetsData = response.data;
      const pendingPetsData = allPetsData.filter((pet) => !pet.approvedStatus);
      const truepets = allPetsData.filter((pet) => pet.approvedStatus);
      setAllPets(truepets);
      setPendingPets(pendingPetsData);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  // Approve Pet
  const handleApprovePet = async (id) => {
    try {
      await axios.post("http://localhost:8080/api/change-pet-status", { id, status: true });
      fetchPetsData();
      // window.location.reload();
    } catch (error) {
      console.error("Error approving pet:", error.response?.data?.msg || error.message);
    }
  };

  // Delete Pet
  const handleDeletePet = async (id) => {
    try {
        await axios.post("http://localhost:8080/api/Admin/deletePets/${id}", { id, status: false });
        fetchPetsData();
        // window.location.reload();
      } catch (error) {
        console.error("Error approving pet:", error.response?.data?.msg || error.message);
      }
  };

  useEffect(() => {
    fetchPetsData();
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pets</h2>

      {/* Toggle Slider */}
      <div className="flex items-center justify-center mb-6 space-x-5">
        <button
          className={`px-4 py-2 ${
            showAllPets ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
          } rounded-l hover:bg-blue-600`}
          onClick={() => setShowAllPets(true)}
        >
          All Pets
        </button>
        <button
          className={`px-4 py-2 ${
            !showAllPets ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
          } rounded-r hover:bg-blue-600`}
          onClick={() => setShowAllPets(false)}
        >
          Pending Requests
        </button>
      </div>

      {/* Content Section */}
      {showAllPets ? (
        <section className="mb-8">
          <h3 className="text-xl font-medium text-gray-700 mb-2">All Pets</h3>
          <div className="space-y-4">
            {allPets.map((pet) => (
              <div key={pet._id} className="p-4 bg-white rounded shadow flex justify-between">
                <div>
                  <p>
                    <strong>Pet Name:</strong> {pet.name}
                  </p>
                  <p>
                    <strong>Type:</strong> {pet.type}
                  </p>
                </div>
                <button
                  onClick={() => handleDeletePet(pet._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section>
          <h3 className="text-xl font-medium text-gray-700 mb-2">Pending Requests</h3>
          <div className="space-y-4">
            {pendingPets.map((pet) => (
              <div key={pet._id} className="p-4 bg-white rounded shadow flex justify-between">
                <div>
                  <p>
                    <strong>Pet Name:</strong> {pet.name}
                  </p>
                  <p>
                    <strong>Type:</strong> {pet.type}
                  </p>
                </div>
                <div className=" space-x-5">

                <button
                    onClick={() => navigate(`/pet/${pet._id}`)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    View
                  </button>
                    <button
                    onClick={() => handleApprovePet(pet._id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                    Approve
                    </button>
                    <button
                    onClick={() => handleDeletePet(pet._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                    Delete
                    </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Pets;
