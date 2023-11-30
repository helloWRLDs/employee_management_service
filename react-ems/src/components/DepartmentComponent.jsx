import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { listEmployees } from '../service/EmployeeService';
import { createDepartment, getDepartment, updateDepartment } from '../service/DepartmentService';

const DepartmentComponent = () => {
  const navigator = useNavigate();

  const [departmentName, setDepartmentName] = useState('');
  const [departmentDescription, setDepartmentDescription] = useState('');
  const [managerId, setManagerId] = useState('');
  const [employees, setEmployees] = useState([])
  const {id} = useParams();
  const [errors, setErrors] = useState({
    departmentName: "",
    departmentDescription: ""
  })

  const validateForm = () => {
    let valid = true;

    const errorCopy = {... errors}

    if (departmentName.trim()) {errorCopy.departmentName = ""} 
    else {
        errorCopy.departmentName = "Department Name is required";
        valid = false;
    }

    if (departmentDescription.trim()) { errorCopy.departmentDescription = ""} 
    else {
        errorCopy.departmentDescription = "Description is required";
        valid = false;
    }
    setErrors(errorCopy);
    return valid;
}

  const saveDepartment = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const department = {departmentName, departmentDescription, managerId};
      if (id) {
        updateDepartment(id, department).then((response) => {
          console.log(response.data);
          navigator(`/departments/`);
        })
      } else {
        createDepartment(department).then((response) => {
          console.log(response.data);
          navigator(`/departments/`);
        })
      }
    } 
  }

  useEffect(() => {
    listEmployees().then((response) => {
      setEmployees(response.data);
      if (id != null) {
        return getDepartment(id).then((departmentResonse) => {
          setDepartmentName(departmentResonse.data.departmentName);
          setDepartmentDescription(departmentResonse.data.departmentDescription);
          setManagerId(departmentResonse.data.managerId);
        });
      }
    }).catch(error => {
      console.error(error)
    })
  }, [])
  



  return (
    <div className="container mx-auto">
        {id ? <h1 className='text-3xl font-bold mb-5'>Update Department</h1> : <h1 className='text-3xl font-bold mb-5'>Add Department</h1>  }
        <form>
            <label htmlFor="departmentName" className='block mb-2'>Department Name</label>
            <div className="flex mb-4 items-center">
                <input type="text" name="departmentName" id="departmentName" value={departmentName} onChange={(e) => setDepartmentName(e.target.value)} placeholder='Frontend department' required
                className='border-2 block px-2 py-1'/>
                {errors.departmentName && 
                    <span className='text-red-500 ml-3 flex'>
                        <svg version="1.1" viewBox="0 0 16 16" className='block w-3 mr-1'>
                            <g>
                                <path className='text-red-500 fill-current bg-red-500 block' d="M8,0C3.582,0,0,3.582,0,8s3.582,8,8,8s8-3.582,8-8S12.418,0,8,0z M9,13H7v-2h2V13z M9,10H7V3h2V10z" />
                            </g>
                        </svg>
                        {errors.departmentName}
                    </span> 
                }
            </div>
            
            

            <label htmlFor="departmentDescription" className='block mb-2'>Description</label>
            <div className="flex mb-4 items-center">
                <input type="text" name="departmentDescription" id="departmentDescription" value={departmentDescription} onChange={(e) => setDepartmentDescription(e.target.value)} placeholder='Doe' required
                className='border-2 block px-2 py-1'/>
                {errors.departmentDescription && 
                    <span className='text-red-500 ml-3 flex'>
                        <svg version="1.1" viewBox="0 0 16 16" className='block w-3 mr-1'>
                            <g>
                                <path className='text-red-500 fill-current bg-red-500 block' d="M8,0C3.582,0,0,3.582,0,8s3.582,8,8,8s8-3.582,8-8S12.418,0,8,0z M9,13H7v-2h2V13z M9,10H7V3h2V10z" />
                            </g>
                        </svg>
                        {errors.departmentDescription}
                    </span> 
                }
            </div>
            

            <label htmlFor="managerId" className='block mb-2'>Manager</label>
            <div className="flex mb-4 items-center">
                <select name="managerId" id="managerId" onChange={(e) => setManagerId(e.target.value)} className='py-2 px-3'>
                  {
                    employees.map(employees => 
                      <option key={employees.id} value={employees.id}>{employees.firstName + " " + employees.lastName}</option>
                      )
                  }
                </select>
            </div>
            

            <button className='px-6 py-2 border-2 bg-green-700 hover:bg-green-600 active:bg-green-800 text-white' onClick={saveDepartment}>
                {id ? "Edit" : "Add"}
            </button>
        </form>
    </div>
  )
}

export default DepartmentComponent