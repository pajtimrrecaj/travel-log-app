
import { Container, Row, Col } from 'react-bootstrap'
import ReactTimeAgo from 'react-time-ago'
import './SearchResult.css'


const SearchResult = ({ result }) => {

    return (
        <Container className='result-container'>
            <Row className='title-row'>
                <Col>
                    <h4 className='title'>{result.title}</h4>
                    <p>{result.location}</p>
                </Col>
                <Col className='date-col'>
                    <div className='date-posted'>
                        Posted
                        <ReactTimeAgo date={result.createdAt} locale="en-US" />
                        by {result.author.firstName + " " + result.author.lastName}
                    </div>
                </Col>
            </Row>
            <p>{result.description}</p>
        </Container>
    )
}

export default SearchResult
