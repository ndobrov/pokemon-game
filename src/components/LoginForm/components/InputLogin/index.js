import cn from "classnames";

import s from './style.module.css'


const InputLogin = ({value, label, type="text", name, onChange, required}) => {
    // const onChangeInputLogin = (event) => {
    //     onChange && onChange(event.target.value); 
    // }

    return (
        <div className={s.root} >
            <input 
                name={name}
                type={type} 
                value={value}
                className={s.input} 
                required={required}
                onChange={onChange}
                />
            <span className={s.highlight}></span>
            <span className={s.bar}></span>
            <label 
                className={s.label}>{label}</label>
        </div>
    )
}

export default InputLogin;