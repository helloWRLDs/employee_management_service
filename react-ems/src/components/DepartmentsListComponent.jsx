import React, { useEffect, useState } from 'react'
import { deleteDepartment, listDepartments } from '../service/DepartmentService'
import { useNavigate } from 'react-router-dom'
import '../styles.css'
import { getEmployee } from '../service/EmployeeService'

const DepartmentsListComponent = () => {
    const navigator = useNavigate();
    const [departments, setDepartments] = useState([]);
    const [managerNames, setManagerNames] = useState({})

    useEffect(() => {
        getAllDepartments();
    }, [])

    const getAllDepartments = async () => {
        try {
            const response = await listDepartments();
            setDepartments(response.data);

            const managerPromises = response.data.map(async (department) => {
                try {
                    let employeeResponse = await getEmployee(department.managerId);
                    let employee = employeeResponse.data;
                    return { id: department.id, name: `${employee.firstName} ${employee.lastName}` };
                } catch (error) {
                    console.error(error);
                    return { id: department.id, name: 'Unknown' };
                }
            });

            Promise.all(managerPromises).then((managers) => {
                const names = {};
                managers.forEach((manager) => {
                    names[manager.id] = manager.name;
                });
                setManagerNames(names); // Update state with managerNames
            });
        } catch (error) {
            console.error(error);
        }
    };

    const removeDepartment = (id) => {
        deleteDepartment(id).then((response) => {
            console.log(response.data);
            getAllDepartments();
        })
    }



    return (
        <div className="container mx-auto">
            <h2 className='text-4xl text-center pb-7'>Departments List</h2>
            <button className='px-4 py-3 bg-blue-700 text-white mb-3 hover:bg-blue-500 active:bg-blue-800' onClick={ () => navigator(`/add-department`) }>Add Department</button>
            <table className='border border-collapse border-slate-700 mx-auto text-xl w-full'>
                <thead>
                    <tr className='border border-collapse border-slate-700'>
                        <th className='px-4 py-3 border border-slate-700 '>#</th>
                        <th className='px-4 py-3 border border-slate-700 '>Department Name</th>
                        <th className='px-4 py-3 border border-slate-700 '>Description</th>
                        <th className='px-4 py-3 border border-slate-700 '>Manager</th>
                        <th className='px-4 py-3 border border-slate-700 w-auto'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        departments.map(departments => 
                            <tr key={departments.id} className='border border-slate-700 py-4'>
                                <td className='px-4 py-3 border border-slate-700 text-center'>{ `${departments.id}` }</td>
                                <td className='px-4 py-3 border border-slate-700 text-center'>{ departments.departmentName}</td>
                                <td className='px-4 py-3 border border-slate-700 text-center'>{ departments.departmentDescription }</td>
                                <td className='px-4 py-3 border border-slate-700 text-center'>{ `${managerNames[departments.id]}`}</td>
                                <td className='px-4 py-3 border border-slate-700 text-center'>
                                    <button onClick={() => navigator(`/edit-department/${departments.id}`)} className='px-6 py-2 border-2 bg-green-700 hover:bg-green-600 active:bg-green-800 text-white'>
                                        Update
                                    </button>
                                    <button onClick={() => removeDepartment(departments.id)} className='px-6 py-2 border-2 bg-red-700 hover:bg-red-600 active:bg-red-800 text-white'>
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

export default DepartmentsListComponent