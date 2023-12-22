import { useState } from 'react'
import '../src/assets/css/App.scss'
import Header from './components/headerComponents/Header';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SideBar from './components/headerComponents/SideBar';
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics';
import Audience from './pages/Audience/Audience';
import Campaign from './pages/Campaign';
import Inbox from './pages/Inbox';
import LogIn from './pages/LogIn';
import Profile from './pages/Profile/Profile';
import ProfileSettings from './pages/ProfileSettings';
import SingUp from './pages/SingUp';
import DoesNotExist from './pages/404DoesNotExist';
import AudienceSegments from './pages/Audience/Segments';
import AllContacts from './pages/Audience/AllContacts';



function App() {

  return (
    <div>
      <Header />
      <SideBar className="app-sidebar"/>
      <div className="app-container">
      <Routes>
        <Route path="/" element={<LogIn />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/analytics" element={<Analytics />}/>
        <Route path="/audience" element={<Audience />}/>
        <Route path="/audience/segments" element={<AudienceSegments />}/>
        <Route path="/audience/all-contacts" element={<AllContacts />}/>
        <Route path="/campaign" element={<Campaign />}/>
        <Route path="/inbox/:id" element={<Inbox />}/>
        <Route path="/profile/:id" element={<Profile />}/>
        <Route path="/profile/settings/:id" element={<ProfileSettings />}/>
        <Route path="/user/login" element={<LogIn />} />
        <Route path="/user/create" element={<SingUp />} />
        <Route path="*" element={<DoesNotExist />}/>
      </Routes>
      </div>
    </div>
  )
}

export default App
