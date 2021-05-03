import React from 'react'
import Form from 'react-bootstrap/Form'
import PropTypes from 'prop-types'

const orderList = [ // ? WHAT does should be here
    { value: 'descending', title: 'Сначала новые' },
    { value: 'ascending', title: 'Сначала старые' },
    { value: 'own', title: 'Сначала собственные' },
    { value: 'another', title: 'Сначала чужие проекты' },
]

const ProjectsSorting = ({ setProjectsOrder, projectsOrder, ...props }) => {
    const onChange = (e) => {
        const value = e.target.value
        if (value) setProjectsOrder(value)
    }
    return (
        <Form>
            <Form.Group controlId="exampleForm.SelectCustom">
                {/* <Form.Label>Custom select</Form.Label> */}
                <Form.Control as='select' value={projectsOrder} onChange={onChange}>
                    {
                        orderList.map(order => {
                            return (
                                <option value={order.value} key={order.value}>{order.title}</option>
                            )
                        })
                    }
                </Form.Control>
            </Form.Group>
        </Form>

    )
}

// ProjectsSorting.propTypes = {
// }

// for sorting:
// 'Reverse',
// 'PrivateOnly',
// 'ReadOnly',
// 'WriteOnly',
// 'OwnOnly',
// 'NotOwnOnly',

export default ProjectsSorting