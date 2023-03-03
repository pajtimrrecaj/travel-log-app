import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import api, { endpoints } from '../../../lib/api'
import { useDispatch } from 'react-redux'
import { login } from '../../../lib/store/slices/authSlice'
import './Login.css'

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessages, setErrorMessages] = useState([])

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errors = []
        setErrorMessages(errors)
        if (!email) {
            errors.push('Please provide an email')
        }
        if (!password) {
            errors.push('Please provide a password')
        }
        if (errors.length) {
            setErrorMessages(errors)
            return
        }

        const response = await api.call(endpoints.login, { email, password, })
        if (!response.confirm) {
            setErrorMessages([response.results])
            return
        }
        dispatch(login(response.results))
    }

    return (
        <Form onSubmit={handleSubmit} className="login-form">

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

            <Button variant="primary" type="submit">
                Submit
            </Button>
            <div className='forgot-password'>
                <Link to="/forgot-password">Forgot Password?</Link>
            </div>

        </Form>
    )
}

export default LoginForm