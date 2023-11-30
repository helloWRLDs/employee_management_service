import './styles.css';
import EmployeesListComponent from './components/EmployeesListComponent';
import { HeaderComponent, FooterComponent } from './components/StaticComponents';
import { AddEmployeeComponent } from './components/EmployeeComponent';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import DepartmentsListComponent from './components/DepartmentsListComponent';
import DepartmentComponent from './components/DepartmentComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path='/' element = {<EmployeesListComponent />} />
          <Route path='/employees/' element = {<EmployeesListComponent />}/>
          <Route path='/add-employee' element = {<AddEmployeeComponent /> } />
          <Route path='/edit-employee/:id' element = {<AddEmployeeComponent />} />

          <Route path='/departments/' element= { <DepartmentsListComponent />} />
          <Route path='/add-department/' element= { < DepartmentComponent />} />
          <Route path='/edit-department/:id' element = {<DepartmentComponent />} />
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
