import React from 'react'
import user from '../Static/Icons/user.svg'
const Header = () => {
    return (
        <>
            <nav className='navbar'>
                <div className='nav-title'>
                    react4movies
                </div>
                <ul className='nav-items'>
                    {/* <li className='nav-item' >
                        <i className="fa fa-user-o " aria-hidden="true"></i>
                    </li>
                    <li className='nav-item' >
                        <i className="fa fa-user-o " aria-hidden="true"></i>
                    </li> */}
                    <li className='nav-item' >
                        <img className='nav-img' src={user} ></img>
                    </li>
                   
                    
                </ul>
            </nav>
        </>
    )
}

export default Header