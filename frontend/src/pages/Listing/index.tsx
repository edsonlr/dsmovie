import axios from "axios";
import { useEffect, useState } from "react";
import { MoviePage } from "types/movie";
import { BASE_URL } from "utils/requests";
import MovieCard from "../../components/MovieCard";
import Pagination from "../../components/Pagination";


function Listing() {


    // uso do hook UseState
    // useState(0) - define o usestate inicializa o pagenumbr com 0 

    const [pageNumber, setPageNumber] = useState(0);

    // uso do hook UseEffect
    //serve para observa o estado do componente - se mudou algo
    // recebe 2 argumentos
    // 1 - uma funcao a ser executada () => {....}
    // 2 - uma lista de objetos a ter o estado  observado , [])
    //     se o objeto for alterado, execcuta a função de novo
    // FORMA CERTA, usando useEffect

    useEffect(() => {
        // vai executar esta funcao somente na hora que carregar o componente
        // ou se mudar o estado do componente
        axios.get(`${BASE_URL}/movies?size=12&page=1`)
            .then(response => {

                // pega a resposta da requisição
                const data = response.data as MoviePage
                // seta o número da página
                console.log(response.data);
                setPageNumber(data.number);
            })
    }, []);


    // codigo do episodio 3 - fazer requisição
    //  .then() - para executar alguma coisa quando a requisição voltar
    // `${BASE_URL}/movies?size=12&page=2` - pega a varável que foi definida no utils/requests
    // Atenção = tem que colocar entre crases ``
    // PRIMEIRA FORMA ERRADA
    // axios.get(`${BASE_URL}/movies?size=12&page=2`)
    //   .then(response => {
    //     console.log(response.data);
    //})

    // SEGUNDA FORMA ERRADA  USANDO variaveis e usestate
    // o codigo abaixo foi jogado para dentro do useeffect
    // axios.get(`${BASE_URL}/movies?size=12&page=1`)
    //.then(response => {
    // pega a resposta da requisição
    //   const data = response.data as MoviePage
    // seta o número da página
    // setPageNumber(data.number);
    //      });

    return (
        <>

            <p>{pageNumber}</p>


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