import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieFormDialogComponent } from '../movie-form-dialog/movie-form-dialog.component';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  private snackbarDuration: number = 4 * 1000;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private service: MovieService
  ) { }

  ngOnInit(): void {
  }

  getSwitchUrl() {
    let switchurl: string = "";
    switch (this.router.url){
      case '/': 
        switchurl = "/advanced"; 
        break;
      case '/advanced': 
        switchurl = "/basic"; 
        break;
      default:
        switchurl = "/"; 
        break;
    }
    return switchurl;
  }

  private openSnackBar(message: string) {
    this._snackBar.open(message,"Close",{
      duration: this.snackbarDuration,
    });
  }

  // BUTTON => SWITCH VIEW
  showSwitchViewSnackbar(){
    let newviewmode: String = "";
    if(this.router.url == "/") newviewmode = "advanced"; else newviewmode = "basic";
    this._snackBar.open("Changed view to " + newviewmode,"Close",{
      duration: this.snackbarDuration,
    });
  }

  // BUTTON => INFO
  openInfoDialog() {
    this.dialog.open(InfoDialog);
  }

  // BUTTON => ADD MOVIE
  showAddMovieDialog(){
    const dialogRef = this.dialog.open(MovieFormDialogComponent, {
      data: new Movie()
    });
    dialogRef.afterClosed().subscribe(
      data => this.addMovie(data)
    );
  }

  private addMovie(movie: Movie){
    console.log(movie);
    this.service.create(movie).subscribe({
      next: movie => {
        this.openSnackBar("Created movie");
        //this.reloadPage();
      },
      error: error => {
        this.openSnackBar("Failed to create movie");
        console.log(error);
      }
    });
  }

  // BUTTON => RELOAD
  reloadPage(){
    window.location.reload();
  }

}

// Application Info Dialog
@Component({
  selector: 'info-dialog',
  templateUrl: 'info-dialog.html',
})
export class InfoDialog {}