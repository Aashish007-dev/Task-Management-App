import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/DashboardLayout'
import { MdDelete } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SelectedUsers from '../../components/SelectedUsers';
import TodoListInput from '../../components/TodoListInput';
import AddAttechmentsInput from '../../components/AddAttachmentsInput';
import AddAttachmentsInput from '../../components/AddAttachmentsInput';
import axiosInstance from '../../utils/axiosInstance';

const CreateTask = () => {
  const location = useLocation();
  const {taskId} = location.state || {};
  const navigate = useNavigate();
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [error, setError] = useState("");
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: null,
    assignedTo: [], 
    todoCheckList: [],
    attachments: []
  })

  const handleValueChange = (key, value) => {
    setTaskData((prev) => ({...prev, [key]: value}))
  }

  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: null,
      assignedTo: [], 
      todoCheckList: [],
      attachments: []
    })
  }

  const [currentTask, setCurrentTask] = useState(null);
  const [loading, setLoading] = useState(false);

  const createTask = async () => {
    try {
      const todolist = taskData.todoCheckList?.map((item) => ({
        text: item,
        completed: false
      }))

      const response = await axiosInstance.post("/tasks/create", {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoCheckList: todolist,
        
      })
      clearData()

      console.log(response.data)
    } catch (error) {
      console.log("Error creating task!", error)
    }
  }

  const updateTask = async () => {
    try {
      
    } catch (error) {
      
    }
  }

  const getTaskDetailsById = async () => {
    try {
      
    } catch (error) {
      
    }
  }

  const deleteTask = async () => {
    try {
      
    } catch (error) {
      
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if(!taskData.title.trim()){
      setError("Title is required!");
      return
      
    }

    if(!taskData.description.trim()){
      setError("Description is required!");
      return
      
    }

    if(!taskData.dueDate){
      setError("Due Date is required!");
      return
      
    }

    if(taskData.assignedTo?.length === 0){
      setError("Task is not assign to anyone");
      return
      
    }

    if(taskData.todoCheckList?.length === 0){
      setError("add at least one task!");
      return
      
    }

    if(taskId){
      updateTask();
      return;
    }

    createTask();
    
  }
  return (
    <DashboardLayout activeMenu={"Create Task"}>
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mt-6">
            <h2 className='text-2xl font-bold text-gray-800'>
              {taskId ? "Update Task" : "Create New Task"}
            </h2>
            {taskId && (
              <button onClick={() => setOpenDeleteAlert(true)} className='flex items-center gap-2 text-red-600 hover:text-red-800'>
                <MdDelete className='text-lg cursor-pointer' /> Delete Task
              </button>
            )}
          </div>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md ">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Task Title <span className='text-red-500'>*</span></label>
                <input 
                type="text"  
                placeholder='Enter task title' 
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={taskData.title}
                onChange={(e) => handleValueChange("title", e.target.value)}/>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Description <span className='text-red-500'>*</span></label>
                <textarea  
                placeholder='Enter task description' 
                rows={4}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={taskData.description}
                onChange={(e) => handleValueChange("description", e.target.value)}/>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Priority
                  </label>
                  <select className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  value={taskData.priority}
                  onChange={(e) => handleValueChange("priority", e.target.value)}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Due Date
                  </label>
                  <div className='relative'>
                    <DatePicker  selected={taskData.dueDate} onChange = {(data) => handleValueChange("dueDate", data)} minDate={new Date()} 
                    placeholderText='Select due date'  
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />

                  </div>
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Assign To <span className='text-red-500'>*</span>
                  </label>
                  <SelectedUsers selectedUser={taskData.assignedTo} setSelectedUser={(value) => handleValueChange("assignedTo", value)}/>
              </div>
              <div className="mt-3">
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                    TODO CheckList <span className='text-red-500'>*</span>
                  </label>

                  <TodoListInput todoList = {taskData?.todoCheckList} setTodoList = {(value) => handleValueChange("todoCheckList", value)}/>
              </div>
              <div className="mt-3">
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Add Atttachments 
                </label>

                <AddAttachmentsInput attachments = {taskData?.attachments} setAttachments = {(value) => handleValueChange("attachments", value)} />

              </div>
              
              <div className="flex justify-end mt-7 ">
                <button 
                onClick={handleSubmit}
                type='button'
                className='px-2 py-2 bg-green-500 border border-green-300 rounded-md text-white hover:bg-green-800 cursor-pointer w-full'>
                  {taskId ? "Update Task" : "Create Task"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CreateTask