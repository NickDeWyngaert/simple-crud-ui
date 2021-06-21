import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  private urlRegex = /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MovieFormDialogComponent>,
    private _snackBar: MatSnackBar,
    private service: MovieService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: new FormControl('',[
        Validators.required, 
        Validators.nullValidator
      ]),
      genre: new FormControl('',[
        Validators.required, 
        Validators.nullValidator
      ]),
      director: new FormControl('',[
        Validators.required, 
        Validators.nullValidator
      ]),
      release: new FormControl('',[
        Validators.required, 
        Validators.nullValidator
      ]),
      duration: new FormControl('',[
        Validators.required, 
        Validators.nullValidator,
        Validators.min(1),
      ]),
      imagelink: new FormControl('',[
        Validators.required, 
        Validators.nullValidator,
        Validators.pattern(this.urlRegex),
      ]),
      about: new FormControl('',[
        Validators.required, 
        Validators.nullValidator
      ]),
    });
  }

  /* get title() { return this.form.get('title'); }
  get genre() { return this.form.get('genre'); }
  get director() { return this.form.get('director'); }
  get release() { return this.form.get('release'); }
  get duration() { return this.form.get('duration'); }
  get imagelink() { return this.form.get('imagelink'); }
  get about() { return this.form.get('about'); } */

  private openSnackBar(message: string) : void {
    this._snackBar.open(message,"Close",{
      duration: this.snackbarDuration,
    });
  }

  close() : void {
    this.dialogRef.close();
  }

  resetform() : void {
    this.form.reset();
  }

  addMovie() {
    let movie: Movie = this.form.value;
    if(movie == null) this.openSnackBar("You cannot create a empty movie :(");
    else { 
      this.service.create(movie).subscribe({
        next: movie => {
          // this.openSnackBar("Created movie");
          this.dialogRef.close();
          window.location.reload();
        },
        error: error => {
          this.openSnackBar("Failed to create movie");
          console.log(error);
          this.dialogRef.close();
        }
      });
    }
  }

}
