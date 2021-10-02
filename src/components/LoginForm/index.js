import { useState } from "react";
import InputLogin from "./components/InputLogin/index";
import s from './style.module.css'
 

const LoginForm = ({onSubmit, title, onChangeRegister}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handlerSubmit = (e) => {
        e.preventDefault();
        onSubmit && onSubmit({
            email,
            password
        });
        setEmail('');
        setPassword('');
    }
    return (
        <form onSubmit={handlerSubmit}>
            <InputLogin
                label={'E-mail'}
                value={email}
                type="text" 
                name="email" 
                placeholder=" webdev@gmail"
                onChange={(e) => setEmail(e.target.value)} 
            /> 
            
            <InputLogin 
                label={'Password'}
                value={password} 
                type="password" 
                name="password" 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button >
                SIGNIN
            </button>
            <div 
                onClick={onChangeRegister}
                className={s.labelRegister}
                >
                {title} ?
                </div>
        </form>

    )
}

export default LoginForm;