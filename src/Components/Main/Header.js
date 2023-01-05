import React from 'react'
import user from '../static/icons/user.svg'
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
                    {/* <li className='nav-item' >
                        <img className='nav-img' src={user} ></img>
                    </li> */}
                    <div class="navbar-dropdown">
                    <li className='nav-item' >
                        <img className='nav-img' src={user} ></img>
                    </li>
                        <div class="navbar-dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>

                </ul>
            </nav>
        </>
    )
}

export default Header