import MovieScore from "../MovieScore";
import { Link } from "react-router-dom";
import { Movie } from "types/movie";

// Uso do Props
// definindo o tipo movie, para incluir na funcao Moviecard

type Props = {
    movie: Movie;
}

// funcao quando não usava Props
// function MovieCard() {
    // filme mockado - fixo
    //substituido pelo conteudo dinamico usando Props
       // const movie = {
       //    id: 1,
       //    image: "https://www.themoviedb.org/t/p/w533_and_h300_bestv2/jBJWaqoSCiARWtfV0GlqHrcdidd.jpg",
       //    title: "The Witcher",
       //    count: 2,
       //   score: 4.5
       //};

    // funcao usando Props
    function MovieCard( { movie} : Props) {

        
    return (
        
        <div>
            <img className="dsmovie-movie-card-image" src={movie.image} alt={movie.title} />
            <div className="dsmovie-card-bottom-container">
                <h3>{movie.title}</h3>
                <MovieScore />

                <Link to={`/form/${movie.id}`}>
                    <div className="btn btn-primary dsmovie-btn">Avaliar</div>
                </Link>



            </div>
        </div>
    );
}

export default MovieCard;

