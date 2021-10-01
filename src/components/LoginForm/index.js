import { useState } from "react";
import InputLogin from "./components/InputLogin/index";

const LoginForm = ({onSubmit}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const onChangeLogin=((e) => setEmail(e.target.value))

    const handlerSubmit = (e) => {
        e.preventDefault();
        onSubmit && onSubmit({
            email,
            password
        });
        setEmail('');
        setPassword('');
    }
    console.log(email, password)
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
            Login
            </button>
        </form>

    )
}

export default LoginForm;