import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { addEmployee, getEmployee, putEmployee } from '../service/EmployeeService';

export  const AddEmployeeComponent = () => {
    const navigator = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const {id} = useParams();
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: ""
    })

    useEffect(() => {
        if (id) {
            getEmployee(id).then((Response) => {
                setFirstName(Response.data.firstName);
                setLastName(Response.data.lastName);
                setEmail(Response.data.email)
            }).catch(error => {
                console.error(error);
            })
        } 
    }, [id])

    const saveEmployee = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const employee = {firstName, lastName, email};
            if (id) {
                putEmployee(id, employee).then((Response) => {
                    console.log(Response.data)
                    navigator("/employees")
                })
            } else {
                addEmployee(employee).then((Response) => {
                    console.log(Response.data)
                    navigator("/employees")
                });
            }
        }

        
    }
    const validateForm = () => {
        let valid = true;

        const errorCopy = {... errors}

        if (firstName.trim()) {errorCopy.firstName = ""} 
        else {
            errorCopy.firstName = "First Name is required";
            valid = false;
        }

        if (lastName.trim()) { errorCopy.lastName = ""} 
        else {
            errorCopy.lastName = "Last Name is required";
            valid = false;
        }

        if (email.trim()) { errorCopy.email = ""} 
        else {
            errorCopy.email = "Email is required";
            valid = false;
        }
        setErrors(errorCopy);
        return valid;
    }

  return (
    <div className="container mx-auto">
        {id ? <h1 className='text-3xl font-bold mb-5'>Update Employee</h1> : <h1 className='text-3xl font-bold mb-5'>Add Employee</h1>  }
        <form>
            <label htmlFor="firstName" className='block mb-2'>First Name</label>
            <div className="flex mb-4 items-center">
                <input type="text" name="firstName" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='John' required
                className='border-2 block px-2 py-1'/>
                {errors.firstName && 
                    <span className='text-red-500 ml-3 flex'>
                        <svg version="1.1" viewBox="0 0 16 16" className='block w-3 mr-1'>
                            <g>
                                <path className='text-red-500 fill-current bg-red-500 block' d="M8,0C3.582,0,0,3.582,0,8s3.582,8,8,8s8-3.582,8-8S12.418,0,8,0z M9,13H7v-2h2V13z M9,10H7V3h2V10z" />
                            </g>
                        </svg>
                        {errors.firstName}
                    </span> 
                }
            </div>
            
            

            <label htmlFor="lastName" className='block mb-2'>Last Name</label>
            <div className="flex mb-4 items-center">
                <input type="text" name="lastName" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Doe' required
                className='border-2 block px-2 py-1'/>
                {errors.lastName && 
                    <span className='text-red-500 ml-3 flex'>
                        <svg version="1.1" viewBox="0 0 16 16" className='block w-3 mr-1'>
                            <g>
                                <path className='text-red-500 fill-current bg-red-500 block' d="M8,0C3.582,0,0,3.582,0,8s3.582,8,8,8s8-3.582,8-8S12.418,0,8,0z M9,13H7v-2h2V13z M9,10H7V3h2V10z" />
                            </g>
                        </svg>
                        {errors.lastName}
                    </span> 
                }
            </div>
            

            <label htmlFor="email" className='block mb-2'>Email</label>
            <div className="flex mb-4 items-center">
                <input typeof='email' type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='doe231@gmail.com' required
                className='border-2 block px-2 py-1'/>
                {errors.email && 
                    <span className='text-red-500 ml-3 flex'>
                        <svg version="1.1" viewBox="0 0 16 16" className='block w-3 mr-1'>
                            <g>
                                <path className='text-red-500 fill-current bg-red-500 block' d="M8,0C3.582,0,0,3.582,0,8s3.582,8,8,8s8-3.582,8-8S12.418,0,8,0z M9,13H7v-2h2V13z M9,10H7V3h2V10z" />
                            </g>
                        </svg>
                        {errors.email}
                    </span> 
                }
            </div>
            

            <button className='px-6 py-2 border-2 bg-green-700 hover:bg-green-600 active:bg-green-800 text-white' onClick={saveEmployee}>
                {id ? "Edit" : "Add"}
            </button>
        </form>
    </div>
  )
}
