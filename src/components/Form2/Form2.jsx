import React from "react";
import './Form2.css';
import { useTelegram } from "../../hooks/useTelegram";

const Form2 = () => {
    const {user, onClose} = useTelegram();

    return (
       <div>
       Form2
       </div>
    );
};

export default Form2;