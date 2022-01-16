import { MoviePage } from 'types/movie';
import { ReactComponent as Arrow } from '../../assets/img/arrow.svg';
import './styles.css';

//Props para incluir paginação dinâmica

type Props = {
    page: MoviePage;
    // parâmetro recebido de handlePageChange em Listing
    OnChange: Function;
}

function Pagination({ page, OnChange } : Props) {

    
    return (
        <div className="dsmovie-pagination-container">
            <div className="dsmovie-pagination-box">
                <button className="dsmovie-pagination-button" 
                    disabled={page.first} onClick={() => OnChange(page.number - 1)} >
                    <Arrow />
                </button>
                <p>{`${page.number + 1} de ${page.totalPages}`}</p>
                <button className="dsmovie-pagination-button" 
                    disabled={page.last} onClick={() => OnChange(page.number + 1)} >
                    <Arrow className="dsmovie-flip-horizontal" />
                </button>
            </div>
        </div>


    );
}

export default Pagination;