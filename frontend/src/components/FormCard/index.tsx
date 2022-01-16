// codigo vindo do Form e adaptado para este novo componente

import './styles.css';
import { Link, useNavigate } from "react-router-dom";
import { Movie } from 'types/movie';
import { useEffect, useState } from 'react';
import axios, {AxiosRequestConfig} from 'axios';
import { BASE_URL } from 'utils/requests';
import { validateEmail } from 'utils/validate';

// para receber o id do filme que quer ver
// só vai receber o Id tipo basico string do Movie, e não o objeto Movie inteiro
// o movieId vem na URL - /1 ou  /2 por exemplo

type Props = {
    movieId: string;
}

// Form( {movie} : Props) - para receber o id do filme que quer ver
// só vai receber o Id tipo String do Movie, e não o objeto Movie inteiro
function FormCard({ movieId }: Props) {

    // definição de filme mockado para testes
    // const movie = {
    //    id: 1,
    //    image: "https://www.themoviedb.org/t/p/w533_and_h300_bestv2/jBJWaqoSCiARWtfV0GlqHrcdidd.jpg",
    //    title: "The Witcher",
    //    count: 2,
    //    score: 4.5
    //};

    const navigate = useNavigate();

    // lógica para buscar do backend o  filme com o Id solicitado

    const [movie, setMovie] = useState<Movie>();

    // UseEffect para buscar o filme com  axios.get
    // Importante : tem que colocar o [movieId] nas dependências do UseEffect do
    // FormCard , para garantir que  a requisição só seja feita uma vez ou se mudar o movieID

    useEffect(() => {
        axios.get(`${BASE_URL}/movies/${movieId}`)
            .then(response => {
                setMovie(response.data);
            });
    }, [movieId]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const email = (event.target as any).email.value;
        const score = (event.target as any).sscore.value;

        // funcao para testar se sintaxe do email é valida xxx@xmail.com
        if (!validateEmail(email)) {
            return;
        }

        // console.log(email, score);

        const config: AxiosRequestConfig = {
            baseURL: BASE_URL,
            method: 'PUT',
            url: '/scores',
            data: {
                email: email,
                movieId: movieId,
                score: score
            }
        }
        
        axios(config).then(response => {
            console.log(response.data);
            navigate("/");
        })
    }


    // src={movie?.image} - a interrogação movie? é para garantir que mesmo qque o objeto não exista
    // o código funcione
    return (

        <div className="dsmovie-form-container">
            <p>{movie}</p>
            <img className="dsmovie-movie-card-image" src={movie?.image} alt={movie?.title} />
            <div className="dsmovie-card-bottom-container">
                <h3>{movie?.title}</h3>
                <form className="dsmovie-form" onSubmit={handleSubmit}>
                    <div className="form-group dsmovie-form-group">
                        <label htmlFor="email">Informe seu email</label>
                        <input type="email" className="form-control" id="email" />
                    </div>
                    <div className="form-group dsmovie-form-group">
                        <label htmlFor="score">Informe sua avaliação</label>
                        <select className="form-control" id="score">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div className="dsmovie-form-btn-container">
                        <button type="submit" className="btn btn-primary dsmovie-btn">Salvar</button>
                    </div>
                </form >
                <Link to="/">
                    <button className="btn btn-primary dsmovie-btn mt-3">Cancelar</button>
                </Link>

            </div >
        </div >

    )
}

export default FormCard;