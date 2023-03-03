import { useState } from "react";
import api, { endpoints } from '../../../lib/api'
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PostForm from '../PostForm/PostForm'


const CreatePostForm = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [errorMessages, setErrorMessages] = useState([])
    const auth = useSelector((state) => state.auth.value)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const errors = []
        setErrorMessages(errors)
        if (!title) {
            errors.push('Please provide a title')
        }
        if (!description) {
            errors.push('Please provide a description')
        }
        if (!location) {
            errors.push('Please provide a location')
        }

        if (errors.length) {
            setErrorMessages(errors)
            return
        }

        const response = await api.call(endpoints.createPost, { token: auth, title, description, location })


        if (!response.confirm) {
            setErrorMessages([response.results])
            return
        }

        setSubmitted(true)

    }

    return (
        <>
            {submitted ? <Navigate to='/profile' /> :
                <PostForm
                    onSubmit={handleSubmit}
                    errorMessages={errorMessages}
                    title={title}
                    onTitleChange={(value) => setTitle(value)}
                    description={description}
                    onDescriptionChange={(value) => setDescription(value)}
                    location={location}
                    onLocationChange={(value) => setLocation(value)}

                />
            }
        </>
    )

}

export default CreatePostForm