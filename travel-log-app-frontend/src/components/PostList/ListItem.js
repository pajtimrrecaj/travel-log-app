import { useState } from 'react'
import api, { endpoints } from '../../lib/api'
import { Container, Row, Col } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { BsThreeDots } from 'react-icons/bs'
import EditPostForm from '../Forms/EditPost';
import ReactTimeAgo from 'react-time-ago'

import './ListItem.css'

const ListItem = ({ post, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(post.title)
    const [description, setDescription] = useState(post.description)
    const [location, setLocation] = useState(post.location)
    const [datePosted] = useState(post.createdAt)
    const [errorMessages, setErrorMessages] = useState([])


    const handleDelete = async (_id) => {

        const response = await api.call(endpoints.deletePost, { _id })
        onDelete(_id)

    }
    const handleEdit = async (e) => {
        e.preventDefault()

        const errors = []
        setErrorMessages(errors)
        if (!title) {
            errors.push('Please provide a title')
        }
        if (!description) {
            errors.push('Please provide a description')
        }

        if (errors.length) {
            setErrorMessages(errors)
            return
        }

        const response = await api.call(endpoints.editPost, { post: post._id, title, description, location })


        if (!response.confirm) {
            setErrorMessages([response.results])
            return
        }
        onEdit(response.results)

        setIsEditing(false)

    }

    if (!isEditing) {
        return (
            <li>
                <Container className='list-item-container'>
                    <Row className='title-row'>
                        <Col>
                            <h4 className='title'>{title}</h4>
                            <p>{location.placeName}, {location.country}</p>
                        </Col>
                        <Col className='dropdown-col'>
                            <div className='date-posted'>Posted <ReactTimeAgo date={datePosted} locale="en-US" /></div>
                            <DropdownButton id="dropdown-basic-button" title={<BsThreeDots className='three-dots' />}>
                                <Dropdown.Item as='button' onClick={() => setIsEditing(true)}>Edit</Dropdown.Item>
                                <Dropdown.Item as='button' onClick={() => handleDelete(post._id)}>Delete</Dropdown.Item>
                            </DropdownButton>
                        </Col>
                    </Row>
                    <p>{description}</p>
                </Container>
            </li >
        )
    } else {
        return (
            <EditPostForm
                title={title}
                onTitleChange={(value) => setTitle(value)}
                onDescriptionChange={(value) => setDescription(value)}
                description={description}
                onSubmit={handleEdit}
                errorMessages={errorMessages}
                location={location}
                onLocationChange={(value) => setLocation(value)}
            />
        )

    }



}

export default ListItem