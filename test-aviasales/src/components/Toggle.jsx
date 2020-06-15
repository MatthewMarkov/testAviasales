import React, {useState} from "react";
import s from './Toggle.module.scss'
import cn from 'classnames'

const Toggle = (props) => {
    const [theCheapestActive, setTheCheapestActive] = useState(false)
    const [theFastestActive, setTheFastestActive] = useState(false)
    const setCheapestActive = () => {
        props.getTheCheapestTickets();
        setTheCheapestActive(true)
        setTheFastestActive(false)
    }
    const setFastestActive = () => {
        props.getTheFastestTickets();
        setTheFastestActive(true)
        setTheCheapestActive(false)
    }
    return (
        <div className={s.commonButtons}>
        <button className={cn({[s.activeClass] : theCheapestActive})} onClick={setCheapestActive}>САМЫЙ ДЕШЕВЫЙ</button>
        <button className={cn({[s.activeClass] : theFastestActive})} onClick={setFastestActive}>САМЫЙ БЫСТРЫЙ</button>
        </div>
    )
}

export default Toggle