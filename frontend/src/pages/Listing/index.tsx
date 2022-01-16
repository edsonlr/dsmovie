import axios from "axios";
import { BASE_URL } from "utils/requests";
import MovieCard from "../../components/MovieCard";
import Pagination from "../../components/Pagination";


function Listing() {


    // codigo do episodio 3 - fazer requisição
    // FORMA ERRADA
    //  .then() - para executar alguma coisa quando a requisição voltar
    // `${BASE_URL}/movies?size=12&page=2` - pega a varável que foi definida no utils/requests
    // Atenção = tem que colocar entre crases ``

    axios.get(`${BASE_URL}/movies?size=12&page=2`)
        .then(response => {
            console.log(response.data);
        })

    return (
        <>
            <Pagination />

            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
                        <MovieCard />
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
                        <MovieCard />
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
                        <MovieCard />
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
                        <MovieCard />
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
                        <MovieCard />
                    </div>

                </div>
            </div>


        </>
    );
}

export default Listing;