import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
  columnsToDisplay: string[] = ['title', 'director', 'genre', 'duration', 'release'];
  expandedElement: Movie | null = null;

  constructor(
    private service: MovieService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.done = false;
    this.setMovies();
  }

  private setMovies() {
    this.service.getAll().subscribe({
      next: movies => {
        this.movies = movies;
        this.done = true;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  delete(id: number){
    console.log("this");
    this.done = false;
    this.service.delete(id).subscribe(res => {
      this.setMovies();
    });
  }

}
