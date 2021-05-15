import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
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
  nomovies: boolean = true;

  constructor(
    private service: MovieService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.done = false;
    this.nomovies = true;
    this.setMovies();
  }

  private setMovies() {
    this.service.getAll().subscribe({
      next: movies => {
        this.movies = movies;
        this.done = true;
        if(this.movies.length > 0) this.nomovies = false;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  openMovie(id: any) {
    let movie: Movie = <Movie>this.movies.find(m => m.id == Number(id)); 
    this.dialog.open(MovieDetailComponent, {
      data: movie,
    });
  }

}
