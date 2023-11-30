import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8082/employees/';

export const listEmployees = () => axios.get(REST_API_BASE_URL);

export const addEmployee = (employee) => axios.post(REST_API_BASE_URL, employee);

export const getEmployee = (employeeId) => axios.get(REST_API_BASE_URL + employeeId);

export const putEmployee = (employeeId, employee) => axios.put(REST_API_BASE_URL + employeeId, employee)

export const deleteEmployee = (employeeId) => axios.delete(REST_API_BASE_URL + employeeId)