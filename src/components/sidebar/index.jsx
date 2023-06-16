import React from 'react'
import c from './sidebar.module.scss'
import { SideList } from '../../utils'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const path = useLocation().pathname


  return (
    <div className={c.sidebar}>
      <ul className={c.logo}>
        <img 
          src="/img/logo.png" 
          alt=""
        />
      </ul>
      <ul className={c.list}>
        {
          SideList.map(item => (
            <li key={item.id}>
              <Link 
                to={item.path}
                className={path === item.path ? c.active : ''}
              >
                {item.icon}
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Sidebar