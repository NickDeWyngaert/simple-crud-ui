import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';

@Component({
  selector: 'app-view-basic',
  templateUrl: './view-basic.component.html',
  styleUrls: ['./view-basic.component.css']
})
export class ViewBasicComponent implements OnInit {

  movies: Movie[] = [];
  done: boolean = false;
  fetcherror: boolean = false;
  nomovies: boolean = true;

  constructor(
    private service: MovieService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.setMovies();
  }

  private setMovies(): void {
    this.done = false;
    this.fetcherror = false;
    this.nomovies = true;
    this.service.getAll().subscribe(
      (movies: Movie[]) => {
        this.movies = movies;
        this.done = true;
        if(this.movies.length > 0) this.nomovies = false;
        this.fetcherror = false;
      },
      (error: HttpErrorResponse) => {
        this.done = true;
        this.fetcherror = true;
        console.error('There while fetching the movies', error);
      }
    );
  }

  openMovie(id: any) {
    let movie: Movie = <Movie>this.movies.find(m => m.id == Number(id)); 
    this.dialog.open(MovieDetailComponent, {
      data: movie,
    });
  }

  retry(): void {
    this.setMovies();
  }

}
