import { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import api, { endpoints } from '../../../lib/api';
import { countries } from '../../../lib/countries';
import './AddPlace.css'



const AddPlaceForm = () => {
    const [placeName, setPlaceName] = useState('')
    const [country, setCountry] = useState('')
    const [errorMessages, setErrorMessages] = useState([])
    const auth = useSelector((state) => state.auth.value)
    const [submitted, setSubmitted] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()

        const errors = []
        setErrorMessages(errors)
        if (!placeName) {
            errors.push('Please provide a place name')
        }
        if (!country || country === 'default') {
            errors.push('Please select a country')
        }



        if (errors.length) {
            setErrorMessages(errors)
            return
        }

        const response = await api.call(endpoints.addPlace, { placeName, country }, auth)

        if (response) {
            setPlaceName('')
            setCountry('')
            setSubmitted(true)

        }


        if (!response.confirm) {
            setErrorMessages([response.results])
            return
        }


    }


    return (
        <Form className='place-form' onSubmit={handleSubmit}>
            {
                errorMessages.length > 0 &&
                errorMessages.map((elem, index) => (
                    <Alert key={index} variant="danger">
                        {elem}
                    </Alert>
                ))

            }

            {
                submitted && <Alert variant='success'>Place added successfully</Alert>
            }
            <Form.Group className="mb-3">

                <Form.Control
                    type='text'
                    value={placeName}
                    onChange={(e) => {
                        setPlaceName(e.target.value)
                    }}
                    placeholder="Name"

                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Select value={country} onChange={(e) => setCountry(e.target.value)}>
                    <option value="default">Select country</option>
                    {countries.map((country) => (
                        <option value={country.label}>{country.label}</option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form >

    )
}

export default AddPlaceForm