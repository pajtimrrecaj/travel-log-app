import { useSelector } from 'react-redux'
import withLayout from '../../hoc/withLayout'
import SearchResult from '../../components/SearchResult'
import './SearchResults.css'

const SearchResults = () => {
    const results = useSelector((state) => state.search.value)

    if (results.length > 0) {
        return (
            <ul className='result-list'>
                {results.map((result) => (<SearchResult key={result._id} result={result} />))}
            </ul>
        )
    }
    else {
        return <h4 className='no-results'>Nothing found...</h4>
    }

}

export default withLayout(SearchResults)


