import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-form-dialog',
  templateUrl: './movie-form-dialog.component.html',
  styleUrls: ['./movie-form-dialog.component.css']
})
export class MovieFormDialogComponent implements OnInit {

  form: FormGroup = this.fb.group({});
  private snackbarDuration: number = 4 * 1000;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MovieFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Movie,
    private _snackBar: MatSnackBar,
    private service: MovieService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.nullValidator]],
      genre: ['', [Validators.required, Validators.nullValidator]],
      director: ['', [Validators.required, Validators.nullValidator]],
      release: ['', [Validators.required, Validators.nullValidator]],
      duration: ['', [Validators.required, Validators.nullValidator]],
      imagelink: ['', [Validators.required, Validators.nullValidator]],
      about: ['', [Validators.required, Validators.nullValidator]]
    });
  }

  private openSnackBar(message: string) {
    this._snackBar.open(message,"Close",{
      duration: this.snackbarDuration,
    });
  }

  close() {
    this.dialogRef.close();
  }

  addMovie() {
    let movie: Movie = this.form.value;
    if(movie != null){
      this.service.create(movie).subscribe({
        next: movie => {
          this.openSnackBar("Created movie");
          this.dialogRef.close();
        },
        error: error => {
          this.openSnackBar("Failed to create movie");
          console.log(error);
          this.dialogRef.close();
        }
      });
    }
    else { 
      this.openSnackBar("You cannot create a empty movie :(");
    }
  }

}
