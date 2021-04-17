import { useState } from 'react'
import { DatePicker, DatePickerInput } from 'rc-datepicker';
// import Table from './Table'

const weekDays = [
    {
        name: 'Monday',
        abbreviated: 'Mon'
    },
    {
        name: 'Tuesday',
        abbreviated: 'Tue'
    },
    {
        name: 'Wednesday',
        abbreviated: 'Wed'
    },
    {
        name: 'Thursday',
        abbreviated: 'Thu'
    },
    {
        name: 'Friday',
        abbreviated: 'Fri'
    },
    {
        name: 'Saturday',
        abbreviated: 'Sat'
    },
    {
        name: 'Sunday',
        abbreviated: 'Sun'
    },
]

function Calendar({ today, ...props }) {
    const [selectedDay, setSelectedDay] = useState(null)

    const handleTableClick = (event) => {
        const target = event.target.closest('td')
        if (!target) return;
        const targetDay = target.dataset.day
        if (!targetDay) return;
        setSelectedDay(Number(targetDay))
    }

    const onChange = (jsDate, dateString) => {
        console.log(jsDate, dateString)
    }

    return <div>
        <DatePickerInput
            onChange={onChange}
            value={new Date()}
            className='my-custom-datepicker-component'
            // {...anyReactInputProps}
        />

        <DatePicker onChange={onChange} value={new Date()} />
    </div>

    // return <Table
    //     selectedDay={selectedDay}
    //     today={today}
    //     weekDays={weekDays}
    //     handleTableClick={handleTableClick}
    // />
}

export default Calendar