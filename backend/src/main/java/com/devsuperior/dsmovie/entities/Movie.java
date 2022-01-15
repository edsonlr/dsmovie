package com.devsuperior.dsmovie.entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "tb_movie")
public class Movie {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String title;
	private Double score;
	private Integer count;
	private String image;
	
	// 4.Recalcular a avaliação média do filme e salvar no banco de dados.
	
	//faz referencia para todo o conjunto de avaliação de um determidado filme
	// interface Set garante que não terá repetição (List pode ter repetição)
	//HashSet<>() é uma das classes que implementa a interface Set
	//@OneToMany indica que tem varias notas/scores para o mesmo filme
	// mappedBy indica qual o campo do BD Scores que e a key para a pesquisa dos filmes
	// id é chave no Score
	// movie é o atributo dentro do ScorePK
	
	@OneToMany(mappedBy = "id.movie")
	private Set<Score> scores = new HashSet<>();
	
	
	
	
	public Movie() {
		
	}

	public Movie(Long id, String title, Double score, Integer count, String image) {
		super();
		this.id = id;
		this.title = title;
		this.score = score;
		this.count = count;
		this.image = image;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Double getScore() {
		return score;
	}

	public void setScore(Double score) {
		this.score = score;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	//método get para coleção Set 
	public Set<Score> getScores() {
		return scores;
	}


}
