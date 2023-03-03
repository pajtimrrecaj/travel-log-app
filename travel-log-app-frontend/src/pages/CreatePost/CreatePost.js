import withLayout from '../../hoc/withLayout'
import './CreatePost.css'

import { Col } from "react-bootstrap";
import CreatePostForm from '../../components/Forms/CreatePost'

const CreatePost = () => {
    return (
        <Col className='create-post-form'>
            <h4 className="form-title">Create Post</h4>
            <CreatePostForm />
        </Col>
    )
}

export default withLayout(CreatePost)