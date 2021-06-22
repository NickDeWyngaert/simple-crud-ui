import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieFormDialogComponent } from '../movie-form-dialog/movie-form-dialog.component';
import { Movie } from '../movie';

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
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  getSwitchUrl(): string {
    let switchurl: string = "";
    switch (this.router.url){
      case '/basic': switchurl = "/advanced"; break;
      case '/advanced': switchurl = "/basic"; break;
      default: switchurl = "/"; break;
    }
    return switchurl;
  }

  private openSnackBar(message: string): void {
    this._snackBar.open(message,"Close",{
      duration: this.snackbarDuration,
    });
  }

  // BUTTON => SWITCH VIEW
  showSwitchViewSnackbar(): void {
    let newviewmode: String = "";
    if(this.router.url == "/basic") newviewmode = "advanced"; else newviewmode = "basic";
    this.openSnackBar("Changed view to " + newviewmode);
  }

  // BUTTON => INFO
  openInfoDialog(): void {
    this.dialog.open(InfoDialog);
  }

  // BUTTON => ADD MOVIE
  showAddMovieDialog(): void {
    this.dialog.open(MovieFormDialogComponent);
  }

  // BUTTON => RELOAD
  reloadPage(): void {
    window.location.reload();
  }

}

// Application Info Dialog
@Component({
  selector: 'info-dialog',
  templateUrl: 'info-dialog.html',
})
export class InfoDialog {}