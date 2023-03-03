import { Row, Col } from 'react-bootstrap'
import withLayout from '../../hoc/withLayout'
import LoginForm from '../../components/Forms/Login'
import './Login.css'

function Login() {
    return (
        <div className="main">
            <Row>
                <Col md={{ span: 4, offset: 4 }} className='login-section'>
                    <h4 className='form-title'>Login</h4>
                    <LoginForm />
                </Col>
            </Row>
        </div>
    )
}

export default withLayout(Login)
