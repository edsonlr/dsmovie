
// Quase todo o código anterior foi transferido para o novo componente FormCard

import FormCard from "components/FormCard";
import { useParams } from "react-router-dom";


function Form() {

    // UseParams para pegar o parametro id do filme que vem na URL (/1 no exemplo abaixo)
    // http://localhost:8080/movies/1
    const params = useParams();

   

    return (

        // Toda a seção de div que tinha aqui foi para o novo componente FormCard
        // e substituído pela chamada do FormCard - o Form irá pegar o Id e repassar para o FormCard
        // para garantir que o tipo seja reconhecido, será colocado o parametro entre crases
        // e como variável - movieId={`${params.moveId}`} /
        
        <FormCard movieId={`${params.movieId}`} />
        
    );
}

export default Form;