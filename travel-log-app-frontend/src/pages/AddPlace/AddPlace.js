import withLayout from '../../hoc/withLayout'
import { Col } from "react-bootstrap";
import AddPlaceForm from '../../components/Forms/AddPlace'
import './AddPlace.css'

const AddPlace = () => {
    return (
        <Col className='add-place-form'>
            <h4 className="form-title">Add Place</h4>
            <AddPlaceForm />
        </Col>
    )
}

export default withLayout(AddPlace)