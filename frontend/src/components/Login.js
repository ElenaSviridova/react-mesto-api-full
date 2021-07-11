import React, {useState} from 'react';
import '../styles/Login.css';

function Login({handleLogin}) {
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    
    function handleChange(e) {
        const {name, value} = e.target;
        setData({...data,
        [name]: value
        });
    }
    function handleSubmit(e){
        e.preventDefault();
        // здесь обрабатываем вход в систему
        if(!data.email || !data.password) {
            return
        }
        const { email, password } = data;

        handleLogin({ email, password })

    }

    return (
        <div className="login">
            <h1 className="login__title">Вход</h1>
            <form className="login__container" onSubmit={handleSubmit} >
                <input required id="email" className="login__input" type="email" placeholder="Email" name="email" value={data.email} onChange={handleChange}></input>
                <input required id="password" className="login__input" type="password" placeholder="Пароль" name="password" value={data.password} onChange={handleChange}></input>
                <button type="submit" className="login__button">Войти</button>
            </form>
        </div>
    )

}

export default Login