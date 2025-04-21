import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminPanel = () => {
  return(
    <div>
  <img 
    src="../../assets/admin.png"
    alt="Admin Dashboard" 
    style={{ width: '100vw', height: '100vh', marginBottom: '20px' }} 
  />
  {/* <h1>This is the Admin Dashboard and is currently in progress.</h1> */}
</div>

  );

};

export default AdminPanel;
