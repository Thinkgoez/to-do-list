import React, { useState, useEffect } from "react";
import s from './style.module.css'

const orderList = [
    { value: 'descending', title: 'New first' },
    { value: 'ascending', title: 'Old first' },
    { value: 'own', title: 'Own first' },
    { value: 'another', title: 'First others projects' },
]

const SortingDropDown = ({ setProjectsOrder, ...props }) => {
    useEffect(function setupListener() {
        function handleClick(e) {
            if (e.target.closest(`.${s.selectHeader}`)) return false
            setIsOpen(false)
        }
        window.addEventListener('click', handleClick)

        return function cleanupListener() {
            window.removeEventListener('click', handleClick)
        }
    })
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = (title, value) => () => {
        setProjectsOrder(value)
        setSelectedOption(title)
        setIsOpen(false);
    };
    return (
        <div className={`${isOpen ? s.opened : ''}`}>
            <div className={s.selectContainer}>
                <div className={s.selectHeader} onClick={toggling}>
                    {selectedOption || orderList[0].title}
                    <div className={s.arrow}></div>
                </div>
                {isOpen && (
                    <div className={s.selectListContainer}>
                        <ul className={s.selectList}>
                            {orderList.map(order => (
                                <li className={s.selectListItem}
                                    onClick={onOptionClicked(order.title, order.value)}
                                    key={order.value}
                                >
                                    {order.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
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

export default SortingDropDown