import React from 'react'

const Header = ({children}) => {
    return (
        <>
            {/* <!-- Image and text --> */}
            {/* <!-- Navbar --> */}
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                {/* <!-- Container wrapper --> */}
                <div className="container-fluid">
                    <div>
                        {/* <!-- Navbar brand --> */}
                        <a className="navbar-brand" href="#" style={{ float: "left" }}>
                            <img
                                src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                                className="me-2"
                                height="20"
                                alt="MDB Logo"
                                loading="lazy"
                            />
                            <small>MDBootstrap</small>
                        </a>
                    </div>

                    {/* <!-- Right elements --> */}
                    <div className="d-flex align-items-center">
                        {/* <!-- Icon --> */}
                        <a className="text-reset me-3" href="#">
                            <i className="fa fa-shopping-cart"></i>
                        </a>


                        {/* <!-- Avatar --> */}
                        <div className="dropdown">
                            <a
                                className="dropdown-toggle d-flex align-items-center hidden-arrow"
                                href="#"
                                id="navbarDropdownMenuAvatar"
                                role="button"
                                data-mdb-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                    className="rounded-circle"
                                    height="25"
                                    alt="Black and White Portrait of a Man"
                                    loading="lazy"
                                />
                            </a>
                            <ul
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="navbarDropdownMenuAvatar"
                            >
                                <li>
                                    <a className="dropdown-item" href="#">My profile</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Settings</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* <!-- Right elements --> */}
                </div>
            </nav>
            {/* <!-- Navbar --> */}
            <br></br>
            <br></br>
        {children}
        </>
    )
}

export default Header