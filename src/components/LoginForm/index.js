import { useState, useEffect } from "react";
import InputLogin from "./components/InputLogin/index";
import s from './style.module.css'
 

const LoginForm = ({onSubmit, isResetField = false}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setLogin] = useState(true);


    useEffect(() => {
      setEmail('');
      setPassword('') ; 
    }, [isResetField])

    const handlerSubmit = (e) => {
        e.preventDefault();
        onSubmit && onSubmit({
            type: isLogin ? 'login' : 'signup',
            email,
            password
        });
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
            <div className={s.flex}>
            <button >
                {isLogin ? 'Login' : 'Signup'} 
            </button>
            <div 
                onClick={() => setLogin(!isLogin)}
                className={s.link}
                >
                {isLogin ? 'Register' : 'Login'}
                </div>
            </div>
        </form>

    )
}

export default LoginForm;