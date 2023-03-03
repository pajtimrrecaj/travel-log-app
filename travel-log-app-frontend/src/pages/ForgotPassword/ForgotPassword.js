import withLayout from '../../hoc/withLayout'
import ForgotPasswordForm from '../../components/Forms/ForgotPassword'
import { Col } from 'react-bootstrap'
const ForgotPassword = () => {
    return (
        <>
            <h2>ForgotPassword</h2>
            <Col md={{ span: 4 }}>
                <ForgotPasswordForm />
            </Col>
        </>
    )
}
export default withLayout(ForgotPassword)
