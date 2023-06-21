import React from 'react'
import c from './sidebar.module.scss'
import { SideList } from '../../utils'
import { Link, useLocation } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'

const Sidebar = () => {
  const [ active, setActive ] = React.useState(false)
  const path = useLocation().pathname

  return (
    <div className={active ? c.sidebar : c.sidebar_none}>
      <div 
        className={c.open}
        onClick={() => {
          setActive(!active)
        }}
      >
        <li>
          <BiArrowBack />
        </li>
      </div>
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