import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-advanced',
  templateUrl: './view-advanced.component.html',
  styleUrls: ['./view-advanced.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ViewAdvancedComponent implements OnInit {

  movies: Movie[] = [];
  done: boolean = false;
  fetcherror: boolean = false;
  columnsToDisplay: string[] = ['id', 'title', 'director', 'genre', 'duration', 'release'];
  expandedElement: Movie | null = null;
  nomovies: boolean = true;
  private snackbarDuration: number = 4 * 1000;

  constructor(
    private service: MovieService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
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

  retry(): void {
    this.setMovies();
  }

  delete(id: number): void {
    this.service.delete(id).subscribe(
      (response: void) => {
        this.openSnackBar('Succesfully deleted movie with id ' + id);
        this.setMovies();
      },
      (error: HttpErrorResponse) => {
        console.error('Failed to delete movie with ID ' + id, error);
      }
    );
  }

  private openSnackBar(message: string): void {
    this._snackBar.open(message,"Close",{
      duration: this.snackbarDuration,
    });
  }

}
