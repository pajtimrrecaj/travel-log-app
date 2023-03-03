import withLayout from '../../hoc/withLayout'
import { Row, Col } from 'react-bootstrap'
import RegisterForm from '../../components/Forms/Register'
import { useState } from 'react'
const Register = () => {
    const [isRegistered, setIsRegistered] = useState(false)

    return (
        <div className="main">

            <Row>
                <Col md={{ span: 4, offset: 4 }}>
                    <h4 className='form-title'>Register</h4>
                    {!isRegistered ? <RegisterForm setRegistered={setIsRegistered} /> : <h3>Please verify your account</h3>}</Col>
            </Row>
        </div>
    )
}
export default withLayout(Register)
