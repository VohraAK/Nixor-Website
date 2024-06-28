import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRouter';
import Header from './components/Header';
import About from './pages/About';
import ECAs from './pages/ECAs';
import Academics from './pages/Academics';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';

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
    <Route element={<PrivateRoute />}>
      <Route path='/profile' element={<Profile />}/>
    </Route>
    {/* add a detailed create account page */}
  </Routes>
  </BrowserRouter>;
  
}
