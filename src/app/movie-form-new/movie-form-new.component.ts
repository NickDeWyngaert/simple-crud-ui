import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-movie-form-new',
  templateUrl: './movie-form-new.component.html',
  styleUrls: ['./movie-form-new.component.css']
})
export class MovieFormNewComponent implements OnInit {
  form: FormGroup = this.fb.group({});
  private snackbarDuration: number = 4 * 1000;
  private urlRegex = /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MovieFormNewComponent>,
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
        //Validators.pattern(this.urlRegex), // doesn't work anymore?
      ]),
      about: new FormControl('',[
        Validators.required, 
        Validators.nullValidator
      ]),
    });
  }

  get title() { return this.form.get('title'); }
  get genre() { return this.form.get('genre'); }
  get director() { return this.form.get('director'); }
  get release() { return this.form.get('release'); }
  get duration() { return this.form.get('duration'); }
  get imagelink() { return this.form.get('imagelink'); }
  get about() { return this.form.get('about'); }

  private openSnackBar(message: string): void {
    this._snackBar.open(message,"Close",{
      duration: this.snackbarDuration,
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  resetform(): void {
    this.form.reset();
  }

  addMovie(): void {
    let movie: Movie = this.form.value;
    if(movie == null) this.openSnackBar("You cannot create a empty movie :(");
    else {
      this.service.create(movie).subscribe(
        (movie: Movie) => {
          // this.openSnackBar("Created movie");
          this.dialogRef.close();
          window.location.reload();
        },
        (error: HttpErrorResponse) => {
          this.openSnackBar("Failed to create movie");
          console.log("Failed to create movie", error);
          this.dialogRef.close();
        }
      );
    }
  }

}
