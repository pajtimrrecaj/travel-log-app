import { useEffect, useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import api, { endpoints } from '../../../lib/api'
import './PostForm.css'

const PostForm = ({
    onSubmit,
    errorMessages,
    title,
    description,
    onTitleChange,
    onDescriptionChange,
    location,
    onLocationChange,
}) => {

    const [places, setPlaces] = useState([])

    useEffect(() => {
        const getPlaces = async () => {
            const response = await api.call(endpoints.getPlaces)
            setPlaces(response.results)
        }
        getPlaces()
    }, [])




    return (
        <Form onSubmit={onSubmit} className='post-form' encType='multipart/form-data'>
            {
                errorMessages.length > 0 &&
                errorMessages.map((elem, index) => (
                    <Alert key={index} variant="danger">
                        {elem}
                    </Alert>
                ))
            }

            <Form.Group className="mb-3">

                <Form.Control
                    type='text'
                    value={title}
                    onChange={(e) => {
                        onTitleChange(e.target.value)
                    }}
                    placeholder="Title"

                />
            </Form.Group>


            <Form.Group className="mb-3">
                <Form.Select value={location._id} onChange={(e) => onLocationChange(e.target.value)}>
                    <option value='default'>Select location</option>
                    {places.map((place) => (
                        <option key={place._id} value={place._id}>{place.placeName}, {place.country}</option>
                    ))}


                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Control
                    as="textarea"
                    rows={10}
                    value={description}
                    onChange={(e) => {
                        onDescriptionChange(e.target.value)
                    }}
                    placeholder="Description"

                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form >

    )
}

export default PostForm