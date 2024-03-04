import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'
export const Header = () => {
  return (
    <div className='header'>
        <h3 >Mern Blog app</h3>
        <ul>
            <Link to={'/'}><li>Home</li></Link>
            <Link to={'/add-blog'}><li>Add Blog</li></Link>
        </ul>
    </div>
  )
}
