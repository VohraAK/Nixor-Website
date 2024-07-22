import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import UserRoute from './components/UserRouter';
import Header from './components/Header';
import About from './pages/About';
import ECAs from './pages/ECAs';
import Academics from './pages/Academics';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Apply from './pages/Apply';
import StudentRoute from './components/StudentRouter';
import StudentCenter from './pages/StudentCenter';

export default function App() {
  return <BrowserRouter>
  <Header />
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/about' element={<About />} />
    <Route path='/ECAs' element={<ECAs />} />
    <Route path='/academics' element={<Academics />} />
    <Route path='/sign-in' element={<SignIn />} />
    <Route path='/sign-up' element={<SignUp />} />
    <Route element={<UserRoute />}>
      <Route path='/profile' element={<Profile />}/>
      <Route path='/apply-online' element={<Apply />}/>

      <Route element={<StudentRoute />}>
        <Route path='/student-center' element={<StudentCenter />}/>
      </Route>
      
    </Route>
    {/* add a detailed create account page */}
  </Routes>
  </BrowserRouter>;
  
}
