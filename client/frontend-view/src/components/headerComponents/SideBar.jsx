import { Link } from 'react-router-dom'
import React from 'react'
import '../../assets/css/sidebar.scss'

const SideBar = () => {
  return (
    <div className="side-navigation">
      <Link to={'/dashboard'}>Dashboard</Link>
      <nav>
          <ul>
              <li><Link to={'/campaign'}>Campaign</Link></li>
              <li><Link to={'/inbox/:id'}>Inbox</Link></li>
              <li><Link to={'/audience'}>Audience</Link></li>
              <li><Link to={'/analytics'}>Analytics</Link></li>
              <li><Link to={'/profile/:id'}>Profile</Link></li>
              <li><Link to={'/profile/settings/:id'}>Settings</Link></li>
          </ul>   
      </nav>
    </div>
  )
}

export default SideBar