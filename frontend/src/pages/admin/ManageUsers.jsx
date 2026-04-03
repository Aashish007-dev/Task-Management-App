import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import DashboardLayout from '../../components/DashboardLayout';

const ManageUsers = () => {

  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get('/users/get-users');
      if(response.data?.length > 0){
        setAllUsers(response.data)
      }
    } catch (error) {
      console.log("Error fetching Users:", error);
    }
  }

  useEffect(() => {
    getAllUsers();

    return () => {}
  },[])
  return (
    <DashboardLayout activeMenu={"Team Members"}>ManageUsers</DashboardLayout>
  )
}

export default ManageUsers