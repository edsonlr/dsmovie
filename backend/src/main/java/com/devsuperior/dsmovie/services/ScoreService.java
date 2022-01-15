package com.devsuperior.dsmovie.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dsmovie.dto.MovieDTO;
import com.devsuperior.dsmovie.dto.ScoreDTO;
import com.devsuperior.dsmovie.entities.Movie;
import com.devsuperior.dsmovie.entities.Score;
import com.devsuperior.dsmovie.entities.User;
import com.devsuperior.dsmovie.repositories.MovieRepository;
import com.devsuperior.dsmovie.repositories.ScoreRepository;
import com.devsuperior.dsmovie.repositories.UserRepository;

@Service
public class ScoreService {

	@Autowired
	private MovieRepository movieRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ScoreRepository scoreRepository;

	// método para salvar um novo scoe no BD
	// a partir do ScoreDTO

	@Transactional
	public MovieDTO saveScore(ScoreDTO dto) {

		// lógica para salvar o score

		// 2.Recuperar usuário do banco de dados pelo email.

		// buscar o user pelo email no BD
		User user = userRepository.findByEmail(dto.getEmail());
		// Se o usuário não existir, insira no banco.
		if (user == null) {
			user = new User();
			user.setEmail(dto.getEmail());
			// salva user no BD
			// saveAndFlush garante que objeto estará atualizado quando utilizar
			// posteriormente
			user = userRepository.saveAndFlush(user);
		}

		// buscar o filme/movie no BD
		Movie movie = movieRepository.findById(dto.getMovieId()).get();

		// pegar e salvar a nota/score

		Score score = new Score();
		// carrega os dados no objeto
		score.setMovie(movie);
		score.setUser(user);
		// pega a nota/score do DTO ScoreDTO
		score.setValue(dto.getScore());

		// 3.Salvar a avaliação do usuário para o dado filme.
		score = scoreRepository.saveAndFlush(score);

		// para recalcular a media dos scores de um filme tem que alterar a classe Movie
		// e depois colocar o código abaixo

		// movie.getScores() traz todas as notas de um determinado filme
		// o for pega cada score s do filme, soma as notas
		double sum = 0.0;
		for (Score s : movie.getScores()) {
			sum = sum + s.getValue();
		}

		// calcula a média
		// sum - soma de todas as notas do filme
		// quantidade - movie.getScores().size

		double avg = sum / movie.getScores().size();

		// ccoloca os parâmetros nos campos do objeto movie

		movie.setScore(avg);
		movie.setCount(movie.getScores().size());

		// salva/grava no BD
		movie = movieRepository.save(movie);
		
		return new MovieDTO(movie);
	}

}
