import { useState } from "react";
import api, { endpoints } from '../../../lib/api'

import PostForm from '../PostForm/PostForm'


const EditPostForm = ({ title, description, onTitleChange, onDescriptionChange, onSubmit, errorMessages, location, onLocationChange }) => {


    return (
        <PostForm
            errorMessages={errorMessages}
            onSubmit={onSubmit}
            title={title}
            onTitleChange={onTitleChange}
            description={description}
            onDescriptionChange={onDescriptionChange}
            location={location}
            onLocationChange={onLocationChange}
        />
    )

}

export default EditPostForm