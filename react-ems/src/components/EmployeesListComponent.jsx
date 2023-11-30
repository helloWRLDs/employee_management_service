import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles.css'
import { deleteEmployee, listEmployees } from '../service/EmployeeService'
import { listDepartments } from '../service/DepartmentService'


const EmployeesListComponent = () => {
    const navigator = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([])

    useEffect(() => {
        getAllEmployees();
    }, [])

    const getAllEmployees = async () => {
        try {
            const Response = await listEmployees();
            setEmployees(Response.data);
            const departmentResponse = await listDepartments();
            setDepartments(departmentResponse.data);
        } catch (error) {
            console.error(error)
        }
    }

    const checkForeignKeyDependency = (id) => {
        for (let i = 0; i < departments.length; i++) {
            if (departments[i].managerId === id) {
                return false;
            }
        }
        return true;
    }
    
    const removeEmployee = (id) => {
        if (checkForeignKeyDependency(id)) {
            deleteEmployee(id).then((Response) => {
                getAllEmployees();
            })
        } else {
            alert(`Can't leave now. He should leave manager slot`)
        }
    }

    return (
        <div className='container mx-auto'>
            <h2 className='text-4xl text-center pb-7'>Employees List</h2>
            <button className='px-4 py-3 bg-blue-700 text-white mb-3 hover:bg-blue-500 active:bg-blue-800' onClick={ () => navigator(`/add-employee`) }>Add Employee</button>
            <table className='border border-collapse border-slate-700 mx-auto text-xl w-full'>
                <thead>
                    <tr className='border border-collapse border-slate-700'>
                        <th className='px-4 py-3 border border-slate-700 '>#</th>
                        <th className='px-4 py-3 border border-slate-700 '>First Name</th>
                        <th className='px-4 py-3 border border-slate-700 '>Last Name</th>
                        <th className='px-4 py-3 border border-slate-700 '>Email</th>
                        <th className='px-4 py-3 border border-slate-700 w-auto'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee => 
                            <tr key={employee.id} className='border border-slate-700 py-4'>
                                <td className='px-4 py-3 border border-slate-700 text-center'>{employee.id}</td>
                                <td className='px-4 py-3 border border-slate-700 text-center'>{employee.firstName}</td>
                                <td className='px-4 py-3 border border-slate-700 text-center'>{employee.lastName}</td>
                                <td className='px-4 py-3 border border-slate-700 text-center'>{employee.email}</td>
                                <td className='px-4 py-3 border border-slate-700 text-center'>
                                    <button onClick={() => navigator(`/edit-employee/${employee.id}`)} className='px-6 py-2 border-2 bg-green-700 hover:bg-green-600 active:bg-green-800 text-white'>
                                        Update
                                    </button>
                                    <button onClick={() => removeEmployee(employee.id)} className='px-6 py-2 border-2 bg-red-700 hover:bg-red-600 active:bg-red-800 text-white'>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default EmployeesListComponent