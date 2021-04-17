import React from 'react'
import classes from './Calendar.module.css'

const Table = React.memo(({ selectedDay, today, weekDays, handleTableClick, ...props }) => {

    const handleTableChange = (event) => {
        const target = event.target.closest('input')
        if (!target) return
        console.log(target.value)
    }
    let currrentMonthDays = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()

    let firtsMonthDay = new Date(today.getFullYear(), today.getMonth());
    firtsMonthDay = [7, 1, 2, 3, 4, 5, 6][firtsMonthDay.getDay()]

    if(firtsMonthDay !== 1){

    }
    // for (let i = 0; i < getDay(d); i++) {
    //     table += '<td></td>';
    //   }
    // .getMonth return value in range [0 - 11]
    let days = []
    for (let i = 1; i <= Math.ceil(currrentMonthDays / 7); i++) {
        days.push(<tr key={`row ${i}`}>
            {(() => {
                let weekRow = []
                for (let j = (i - 1) * 7 + 1; j <= i * 7 && j <= currrentMonthDays; j++) {
                    // console.log('j',j)
                    // console.log('i',i)
                    let className = (selectedDay === j ? classes.selectedDay : '') + ' '
                        + (today.getDate() === j ? classes.currentDay : '')

                    let cell = <td key={j} data-day={j} className={className}>
                        <input id={j} disabled={today.getDate() > j} name='day' type="radio" value={j} />
                        <label htmlFor={j}>{j}</label>
                    </td>
                    weekRow.push(cell)
                }
                return weekRow
            })()}
        </tr>)
    }
    return (
        <div className={classes.table}>
            <fieldset onChange={handleTableChange}>  {/* <legend><b>Calendar</b></legend> */}
                <table onClick={handleTableClick}>
                    <colgroup>
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col style={{ backgroundColor: 'rgb(248, 108, 108)' }} />
                        <col style={{ backgroundColor: 'rgb(248, 108, 108)' }} />
                    </colgroup>
                    <thead>
                        <tr>
                            {weekDays.map(day => <th key={day.abbreviated}>{day.abbreviated}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {days}
                    </tbody>
                </table>
            </fieldset>
        </div>
    )
})

export default Table