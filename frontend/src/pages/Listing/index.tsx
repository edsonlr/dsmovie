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

    // useState(0) - define o usestate inicial para a pagina com valores copiados dos types/movie.ts
    // e coloca os defaluts
    //useState<MoviePage> - informa que dados são do tipo do estado é generico Moviepage
    const [page, setPage] = useState<MoviePage>({
        content: [],
        last: true,
        totalPages: 0,
        totalElements: 0,
        size: 12,
        number: 0,
        first: true,
        numberOfElements: 0,
        empty: true
    });


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
        //&sort=id - ordena os filmes por id ou poderia ser por titulo tambem - &sort=title)
        axios.get(`${BASE_URL}/movies?size=12&page=${pageNumber}&sort=id`)
            .then(response => {
               
                // estado para gardar  a resposta da requisição
                const data = response.data as MoviePage;
                
                //salva os dados da página vindos da requisição
                setPage(data);

                // - só para teste- seta o número da página e imprime na console 
                // console.log(response.data);
                // setPageNumber(data.number);

            })

        // [pageNumber]); indica que  o useEffect depende do estado do pageNumber
        // quando mudar o pageNumber refaz a requisição
    }, [pageNumber]);


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

    //codigo com filme mockado para teste com props para testes
       //const movie = {
       //    id: 1,
       //    image: "https://www.themoviedb.org/t/p/w533_and_h300_bestv2/jBJWaqoSCiARWtfV0GlqHrcdidd.jpg",
       //    title: "The Witcher",
       //    count: 2,
       //    score: 4.5
       //};


    // no return , se quiser os filmes mockados para teste usar o código abaixo
       // <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
       // <MovieCard movie={movie} />
       // </div>
    //   <p>{pageNumber}</p> - para exibir o numero da página para testes

    // codigo no return para mostrar os filmes dinamicamente:
    // {page.content.map(movie => ( -page.content - permite acessar a lista de filmes
    // {page.content.map(movie => ( - .map - permite executar algo com cada item da coleção
    // {page.content.map(movie => ( - movie => ( - funcao que será executada com cada item da coleção
    // NOTA: numa renderização dinâmica de coleção,cada elemento renderizado DEVE possuir um atributo key
    // <div key={movie.id} - define qual é o atributo key 

    // função para permitir o click dos botoes de avanco/retrocesso de página
    // para mandar o handlePageChange para o componente Pagination -
    // lá vai ter uma função/Props  para receber esta mudança de página 

    const handlePageChange = (newPageNumber : number) => {
        setPageNumber(newPageNumber);
    }

    return (
        <>

            <Pagination page={page}  OnChange={handlePageChange} />

            <div className="container">
                <div className="row">
                    {page.content.map(movie => (
                        <div key={movie.id} className="col-sm-6 col-lg-4 col-xl-3 mb-3">
                            <MovieCard movie={movie} />
                        </div>
                    )
                    )}
                </div>
            </div>
        </>
    );
}

export default Listing;