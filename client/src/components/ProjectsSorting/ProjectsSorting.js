import React from "react";

import s from './style.module.css'
import SortingDropDown from './ProjectsSortingDropdown/SortingDropDown'
import SortingSwitch from "./ProjectsSortingSwitch/SortingSwitch";

const ProjectsSorting = ({ setProjectsOrder, isOnlyOwn, setOnlyOwn, ...props }) => {
    return (
        <div className={s.sortingWrapper}>
            <SortingSwitch checked={isOnlyOwn} setChecked={setOnlyOwn} />
            <SortingDropDown setProjectsOrder={setProjectsOrder} />
        </div>
    )
}

// for sorting:
// 'Reverse',
// 'PrivateOnly',
// 'ReadOnly',
// 'WriteOnly',
// 'OwnOnly',
// 'NotOwnOnly',

export default ProjectsSorting