import Footer from '../components/Footer'
import Header from '../components/Header'
import { Container, Row } from 'react-bootstrap'
import './withLayout.css'

const withLayout = (Comp) => {
    return (props) => (
        <Container fluid className='bootstrap-container'>
            <Row>
                <Header />
            </Row>
            <Row className='middle-row'>
                <Comp {...props} />
            </Row>
            <Row className='footer-row'>
                <Footer />
            </Row>
        </Container>
    )
}

export default withLayout