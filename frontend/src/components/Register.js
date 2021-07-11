import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../styles/Login.css'; 

function Register({handleRegister}) {

    const [ data , setData] = useState({
        email: '',
        password: ''
    });
    


   function handleChange(e) {
       const {name, value} = e.target;
       setData({...data, [name]: value})
   }

    function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = data;
        handleRegister({email, password})
    }

    return (
        <div className='login'>
            <h1 className='login__title'>Регистрация</h1>
            <form className='login__container' onSubmit={handleSubmit}  >
                <input className='login__input' placeholder='Email' type="email" name="email" value={data.email} onChange={handleChange}></input>
                <input className='login__input' placeholder='Пароль' type="password" name="password" value={data.password} onChange={handleChange}></input>
                <button type="submit" className="login__button">Зарегистрироваться</button>
                <h2 className='login__caption'>Уже зарегистрированы? <Link className='login__link' to="/sign-in">Войти</Link></h2>
            </form>
        </div>
    )

}

export default Register