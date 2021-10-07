import { useRef, useEffect } from "react";
import cn from "classnames";

import s from './style.module.css'

const Modal = ({isOpen, title, children, onCloseModal}) => {
    const modalEl = useRef();

    useEffect(() => {
        document.querySelector('body').style.overflow = isOpen? 'hidden' : null;
    }, [isOpen]);
    

    const handlerCloseModal = () => {
        onCloseModal && onCloseModal(false);
    }

    const hendlerClickRoot = (event) => {
        if (!modalEl.current.contains(event.target)) {
            handlerCloseModal(); 
        }
    }

    return (
        <div className={cn(s.root, {
            [s.open]: isOpen
            })}
            onClick={hendlerClickRoot}
            >
            <div 
                ref={modalEl}
                className={s.modal}
            >
                <div 
                    className={s.head}>
                    {title}
                    <span  
                        className={s.btnClose}
                        onClick={handlerCloseModal}
                        ></span>
                </div>
                <div className={s.content}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal;