
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard';
import Login from './components/login';
import Logout from './components/logout';
import { Notes } from './components/notes';
import { Profile } from './components/profile';
import Signup from './components/signup';
import { Tags } from './components/tags';

export default function App(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='notes' element={<Notes />} />
          <Route path='tags' element={<Tags />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='*' element={<h1>Note found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
