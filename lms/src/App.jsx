import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './pages/students/Home'
import CourseList from './pages/students/CourseList'
import CourseDetails from './pages/students/CourseDetails'
import MyEnrollments from './pages/students/MyEnrollments'
import Player from './pages/students/Player'
import Loding from './components/students/Loding'
import Educator from './pages/educator/Educator'
import Dashboard from './pages/educator/Dashboard'
import AddCourse from './pages/educator/AddCourse'
import MyCourse from './pages/educator/MyCourse'
import StudentEnrolled from './pages/educator/StudentEnrolled'
import Navbar from './components/students/Navbar'

const App = () => {

const isEducatorRoute=useMatch('/educator/*')

  return (
    <div className='text-default min-h-screen bg-white'>
     {!isEducatorRoute && <Navbar/>}
     
      <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/course-list' element={<CourseList/>}/>
       <Route path='/course-list/:input' element={<CourseList/>}/>
       <Route path='/course/:id' element={<CourseDetails/>}/>
       <Route path='/my-enrollments' element={<MyEnrollments/>}/>
       <Route path='/player/:courseid' element={<Player/>}/>
       <Route path='/loading/:path' element={<Loding/>}/>
       <Route path='/educator' element={<Educator/>}>
            <Route path='educator' element={<Dashboard/>}/>
            <Route path='add-course' element={<AddCourse/>}/>
            <Route path='my-course' element={<MyCourse/>}/>
            <Route path='student-enrolled' element={<StudentEnrolled/>}/>
       </Route>
      </Routes>
      
      </div>
  )
}

export default App