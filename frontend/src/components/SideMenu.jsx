import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../redux/slice/userSlice';
import  axiosInstance  from '../utils/axiosInstance.js';
import { SIDE_MENU_ITEMS, USER_SIDE_MENU_ITEMS } from '../utils/data.js';


const SideMenu = ({activeMenu}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openSideMenuData, setOpenSideMenuData] = useState([]);

  const {currentUser} = useSelector((state) => state.user);

  const handleClick = (route) => {
    if(route === 'logout'){
      handleLogout();
      return;
    }
    
    navigate(route);
    
  }
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post('/auth/logout', {}, {
        withCredentials: true,
      });
      if(response.data){
        dispatch(logoutSuccess());
        navigate('/login');
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(currentUser){
      setOpenSideMenuData(currentUser?.role === 'admin' ? SIDE_MENU_ITEMS : USER_SIDE_MENU_ITEMS)
    }

    return () => {}
  }, [currentUser])
  return (
    <div className='w-64 p-6 h-full flex flex-col lg:border-r lg:border-gray-200'>
      <div className='flex flex-col items-center mb-8'>
        <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden mb-4 border-2 border-blue-200">
          <img src={currentUser?.profileImageUrl || null} alt="Profile Image" className='w-full h-full object-cover ' />
        </div>
        {
          currentUser?.role === 'admin' && (
            <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2">Admin</div>
          )
        }
        <h5 className='text-lg font-semibold text-gray-800'>{currentUser?.name || ""}</h5>
        <p className='text-sm text-gray-500'>{currentUser?.email || ""}</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        {openSideMenuData.map((item, index) => (
          <button key={`menu_${index}`} onClick={() => handleClick(item.path)} className={`w-full flex items-center gap-4 text-[15px] ${activeMenu === item.label ? 'bg-linear-to-r from-blue-50/40 to-blue-100/50 text-blue-500' : 'text-gray-600 hover:bg-gray-100'} py-3 px-6 mb-3 cursor-pointer`}>
            <item.icon className='text-2xl'/>
            <span className='text-sm font-medium'>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default SideMenu