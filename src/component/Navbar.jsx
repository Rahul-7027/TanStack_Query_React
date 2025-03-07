import React from 'react'
import "./nav.css"
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li><NavLink to="/"> Home</NavLink></li>
                    <li><NavLink to="/about"> About</NavLink></li>
                    <li><NavLink to="/contact"> Contact</NavLink></li>
                    <li><NavLink to="/old"> FetchOld</NavLink></li>
                    <li><NavLink to="/new"> FetchNew</NavLink></li>
                    <li><NavLink to="/infinite"> Infinate Scroll</NavLink></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
