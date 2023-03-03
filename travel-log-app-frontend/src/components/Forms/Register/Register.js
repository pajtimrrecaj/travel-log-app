import { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import api, { endpoints } from '../../../lib/api'
import { emailRegex, passwordRegex } from '../../../lib/constants'
import './Register.css'

const RegisterForm = ({ setRegistered }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [errorMessages, setErrorMessages] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const errors = []
        setErrorMessages(errors)
        if (!emailRegex.test(email)) {
            errors.push('Please provide a valid email address')
        }
        if (!passwordRegex.test(password)) {
            errors.push('Password must have at least 8 characters, at least one letter and one number')
        }
        if (!firstName) {
            errors.push('Please provide a first name')
        }
        if (!lastName) {
            errors.push('Please provide a last name')
        }
        if (errors.length) {
            setErrorMessages(errors)
            return
        }
        const response = await api.call(endpoints.register, { email, password, firstName, lastName })

        if (!response.confirm) {
            setErrorMessages([response.results])
            return
        }
        setRegistered(true)
    }

    return (
        <Form onSubmit={handleSubmit} className="register-form">
            {errorMessages.length > 0 &&
                errorMessages.map((elem, index) => (
                    <Alert key={index} variant="danger">
                        {elem}
                    </Alert>
                ))}

            <Form.Group className='mb-3' controlId='formBasicEmail'>

                <Form.Control
                    type="text"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                    placeholder="Email"
                />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicEmail'>

                <Form.Control
                    type='password'
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    placeholder="Password"
                />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicEmail'>

                <Form.Control
                    type='text'
                    value={firstName}
                    onChange={(e) => {
                        setFirstName(e.target.value)
                    }}
                    placeholder="First Name"
                />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicEmail'>

                <Form.Control
                    type='text'
                    value={lastName}
                    onChange={(e) => {
                        setLastName(e.target.value)
                    }}
                    placeholder="Last Name"
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>


        </Form>
    )
}
export default RegisterForm