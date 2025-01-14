import React, { useState } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import turnippp from '../../assets/turnippp.png';

const Navbar = ({user, login, logout}) => {
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
    const [menu_class, setMenuClass] = useState("menu hidden");
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();



    // Toggle burger menu
    const updateMenu = () => {
        if (!isMenuClicked) {
            setBurgerClass("burger-bar clicked");
            setMenuClass("menu visible");
        } else {
            setBurgerClass("burger-bar unclicked");
            setMenuClass("menu hidden");
        }
        setIsMenuClicked(!isMenuClicked);
    };

    // Handle search input submission
    const handleSearchSubmit = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent page refresh
            navigate(`/search?q=${searchQuery}`);
        }
    };

    return (
        <>
            <nav>
                <div className='left-section'>
                    <div className="burger-menu" data-testid="open-menu" onClick={updateMenu}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Hamburger_icon.svg" alt='drop down menu'></img>
                    </div>

                    <div className="turnippp">
                        <a href="/home" aria-label="Go to home">
                            <img src={turnippp} alt="Turnip logo" />
                        </a>
                    </div>
                </div>

                <div className="search-bar" data-testid="search-exists">
                    <input
                        type="text"
                        placeholder="Search for an event"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearchSubmit}
                    />
                </div>

                <div className='right-section'>
                    {user ? (
                        <button className="login-logout-button" onClick={logout}>Logout</button>
                    ) : (
                        <button className="login-logout-button" onClick={login}>Login</button>
                    )}
                </div>
            </nav>

            <div className={menu_class}>
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/profile">Profile</a></li>
                    <li><a href="/calendar">Calendar</a></li>
                </ul>
            </div>
        </>
    );
};

export default Navbar;
