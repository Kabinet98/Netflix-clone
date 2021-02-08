import '../Css/HomeScreen.css';
import Banner from './Banner';
import Nav from './Nav';
import Row from './Row';
import request from '../Requests';
const HomeScreen = () =>{
    return (
        <div className="homeScreen">
            <Nav />
            <Banner />
            <Row
                title='Netflix Originals'
                fetchURL={request.fetchNetflixOriginals}
                isLarge
            />
            <Row
                title='Top Rated'
                fetchURL={request.fetchTopRated}
            />
            <Row
                title='Action Movies'
                fetchURL={request.fetchActionMovies}
            />
            <Row
                title='Comedy Movies'
                fetchURL={request.fetchComedyMovies}
            />
            <Row
                title='Horror Movies'
                fetchURL={request.fetchHorrorMovies}
            />
            <Row
                title='Romance Movies'
                fetchURL={request.fetchRomanceMovies}
            />
            <Row
                title='Documentaries'
                fetchURL={request.fetchDocumentaries}
            />
        </div>
    )
}
export default HomeScreen;