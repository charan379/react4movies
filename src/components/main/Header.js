import React, { useEffect, useRef, useState } from 'react'
import useOnOutSideClick from '../hooks/useOnOutSideClick';
import user from '../static/icons/user.svg'


const Header = () => {
    
    //  is dropdown open State
    const [isDropdwonOpen,setDropdownOpen] = useState(false);
    const dropdownRef = useRef();
    useOnOutSideClick(dropdownRef, () => setDropdownOpen(false))
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
                    <div ref={dropdownRef} className="navbar-dropdown" onClick={()=>setDropdownOpen(true)}>
                    <li className='nav-item' >
                        <img className='nav-img' src={user} ></img>
                    </li>
                        <div className={isDropdwonOpen ? "navbar-dropdown-content show" : "navbar-dropdown-content"}>
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