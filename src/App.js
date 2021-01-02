import React from 'react';
import {BrowserRouter as Router , Route , Switch , Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';

import MainHeader from './Shared/Components/Header/MainHeader';
import Signin from './Authentication/Signin-Form/LoginForm';
import Dashboard from './Shared/Components/Dashboard/Dashboard';
import AllUSers from './Portal-Admin/AllUsers/AllUsers';
import Teachers from './Portal-Admin/Teachers/Teachers';
import EditTeacher from './Portal-Admin/Teachers/EditTeacher/EditTeacer';
import Students from './Portal-Admin/Students/Students';
import EditStudent from './Portal-Admin/Students/EditStudent/EditStudent';
import Notifications from './Shared/Components/Notifications/Notifications';
import EditNotification from './Shared/Components/Notifications/EditNotification/EditNotification';
import AddSubjects from './Portal-Admin/AddSubjects/AddSubjects';
import EditSubjects from './Portal-Admin/AddSubjects/EditSubject/EditSubject';
import TimeTable from './Portal-Admin/TimeTable/TimeTable';
import ExamSchedule from './Portal-Admin/ExamSchedule/ExamSchedule';

import TecherProfile from './Portal-Teacher/ViewProfile/TeacherProfile';
import MarkAttendance from './Portal-Teacher/MarkAttendance/MarkAttendance';

import StudentProfile from './Portal-Student/ViewProfile/StudentProfile';
import StudentAttendance from './Portal-Student/ViewAttendance/ViewAttendance';

import { setCurrentUser } from './Actions/UsersActions';
import './App.css';
import store from './store';

if (localStorage.user) {
  store.dispatch(setCurrentUser(localStorage.user));
}
const  App = () =>
{
  const { authenticated: signin, role } = useSelector( state => state?.authentication) || {}

let Routes;
if(!signin) 
  Routes = <>
    <Switch>
      <Route path='/' exact>
      <Signin />
      </Route>
      <Route path='/signin' exact>
        <Signin />
      </Route>
      <Redirect to='/' />
    </Switch>
  </>
  else if(signin && role==='admin')
  Routes = <>
    <Dashboard />
    <main>
      <Switch>
        <Route path='/' exact>
          <AllUSers />
        </Route>
        <Route path='/teachers' exact>
          <Teachers />
        </Route>
        <Route path='/editTeacher/:tID' exact>
          <EditTeacher/>
        </Route>
        <Route path='/addTeacher' exact>
          <EditTeacher/>
        </Route>
        <Route path='/students' exact>
          <Students />
        </Route>
        <Route path='/editStudent/:sID' exact>
          <EditStudent/>
        </Route>
        <Route path='/addStudent' exact>
          <EditStudent/>
        </Route>
        <Route path='/notifications' exact>
          <Notifications />
        </Route>
        <Route path='/addNotification' exact>
          <EditNotification />
        </Route>
        <Route path='/editNotification/:nID' exact>
          <EditNotification />
        </Route>
        <Route path='/addSubjects' exact>
          <AddSubjects />
        </Route>
        <Route path='/editSubject/:classId' exact>
          <EditSubjects />
        </Route>
        <Route path='/timetable' exact>
          <TimeTable />
        </Route>
        <Route path='/examSchedule' exact>
          <ExamSchedule />
        </Route> 
      <Redirect to='/' />
      </Switch>
    </main>
  </>
  else if(signin && role==='teacher')
  Routes = <>
  <Dashboard />
    <main>
      <Switch>
        <Route path='/' exact>
          <TecherProfile />
        </Route>
        <Route path='/attendance' exact>
          <MarkAttendance />
        </Route>
        <Redirect to='/' />
      </Switch>
    </main>
  </>

  else if(signin && role==='student')
  Routes = <>
  <Dashboard />
    <main>
      <Switch>
        <Route path='/' exact>
          <StudentProfile />
        </Route>
        <Route path='/attendance' exact>
          <StudentAttendance />
        </Route>
        <Redirect to='/' />
      </Switch>
    </main>
  </>
  return(
      <Router basename='/Sandral'>
        <MainHeader />
        {Routes}
      </Router>
)
}

export default App;
