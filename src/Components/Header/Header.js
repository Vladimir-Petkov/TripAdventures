import React from 'react';
// import 'Header.module.css';

const Header = () => {
    return (
        <nav className="site-header sticky-top py-1">
            <div className="container d-flex flex-column flex-md-row justify-content-between">
                <a className="py-3" href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="30" fill="none" stroke="currentColor"
                        strokeLinecap="round" stroke-linejoin="round" stroke-width="2" className="d-block mx-auto" role="img"
                        viewBox="0 0 70.617 70.617" focusable="false">
                        <title>The Trekking Zone</title>
                        <path d="M70.031,46.254L51.69,27.912c-0.78-0.781-2.047-0.781-2.828,0l-7.281,7.28L28.028,21.639
		c-0.75-0.75-2.078-0.75-2.828,0L0.586,46.253c-0.572,0.572-0.743,1.433-0.434,2.18S1.191,49.667,2,49.667l29.936-0.003
		c0.531,0,1.039-0.211,1.414-0.586l8.231-8.229l8.232,8.232c0.375,0.375,0.884,0.586,1.414,0.586l17.39,0.001
		c0.809,0,1.538-0.487,1.848-1.234S70.604,46.826,70.031,46.254z" />
                    </svg>
                </a>

                <a className="py-3 d-none d-md-inline-block" href="/">Request Trek</a>
                <a className="py-3 d-none d-md-inline-block" href="/profile">Hello, username</a>
                <a className="py-3 d-none d-md-inline-block" href="/logout">Logout</a>
                <a className="py-3 d-none d-md-inline-block" href="/login">Login</a>
                <a className="py-3 d-none d-md-inline-block" href="/register">Register</a>
            </div>
        </nav>
    )
};

export default Header;