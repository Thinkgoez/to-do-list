import React from "react";
import Switch from "react-switch";

import s from './style.module.css'


const SortingSwitch = ({ checked, setChecked, ...props }) => {
    const handleChange = () => setChecked(!checked)
    return (
        <div className={s.switchWrapper}>
            <Switch
                id='SortingSwitch'
                className={s.switch}
                onChange={handleChange}
                checked={checked}
                uncheckedIcon={false}
                checkedIcon={false}
                onColor='#000'
                offColor='#fff'
                onHandleColor='#fff'
                offHandleColor='#000'
            />

            <label htmlFor='SortingSwitch'>Only own project</label>
        </div>
    )
}

export default SortingSwitch