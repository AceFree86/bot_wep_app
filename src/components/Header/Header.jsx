import React from "react";
import './Header.css';

import { useTelegram } from "../../hooks/useTelegram";

const Header = () => {
    const {user, onClose} = useTelegram();

    return (
       <div className = {"header"}>
        <Link to="/" className="header-link">
                <h1>My App</h1>
        </Link>
        
        <button onClick={onClose}>Закрити</button>

        <span className= {"username"}>
            {user?.username}
        </span>
       </div>
    );
};

export default Header;