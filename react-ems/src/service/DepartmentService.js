import axios from "axios";


const REST_API_DEPARTMENTS_URL = "http://localhost:8082/departments/";

export const listDepartments = () => axios.get(REST_API_DEPARTMENTS_URL);

export const createDepartment = (department) => axios.post(REST_API_DEPARTMENTS_URL, department);

export const updateDepartment = (id, department) => axios.put(REST_API_DEPARTMENTS_URL + id, department);

export const getDepartment = (id) => axios.get(REST_API_DEPARTMENTS_URL + id);

export const deleteDepartment = (id) => axios.delete(REST_API_DEPARTMENTS_URL + id);