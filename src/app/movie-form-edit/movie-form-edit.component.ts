import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieService } from '../movie.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Movie } from '../movie';

@Component({
  selector: 'app-movie-form-edit',
  templateUrl: './movie-form-edit.component.html',
  styleUrls: ['./movie-form-edit.component.css']
})
export class MovieFormEditComponent implements OnInit {

  form: FormGroup | null = null;
  movie: Movie | null = null;
  private urlRegex = /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private dialogRef: MatDialogRef<MovieFormEditComponent>,
    private fb: FormBuilder,
    private service: MovieService
  ) { }

  ngOnInit(): void {
    this.setMovie();
  }

  private setMovie(): void {
    this.service.get(<number>this.data).subscribe(
      (movie: Movie) => {
        this.movie = movie;
        this.initForm();
      },
      (error: HttpErrorResponse) => {
        console.error('Something went wrong with getting movie for update with id ' + this.data, error)
      }
    );
  }

  private initForm(): void {
    this.form = this.fb.group({
      title: new FormControl(this.movie?.title,[
        Validators.required, 
        Validators.nullValidator
      ]),
      genre: new FormControl(this.movie?.genre,[
        Validators.required, 
        Validators.nullValidator
      ]),
      director: new FormControl(this.movie?.director,[
        Validators.required, 
        Validators.nullValidator
      ]),
      release: new FormControl(this.movie?.release,[
        Validators.required, 
        Validators.nullValidator
      ]),
      duration: new FormControl(this.movie?.duration,[
        Validators.required, 
        Validators.nullValidator,
        Validators.min(1),
      ]),
      imagelink: new FormControl(this.movie?.imagelink,[
        Validators.required, 
        Validators.nullValidator,
        //Validators.pattern(this.urlRegex), // doesn't work anymore?
      ]),
      about: new FormControl(this.movie?.about,[
        Validators.required, 
        Validators.nullValidator
      ]),
    });
  }

  get title() { return this.form?.get('title'); }
  get genre() { return this.form?.get('genre'); }
  get director() { return this.form?.get('director'); }
  get release() { return this.form?.get('release'); }
  get duration() { return this.form?.get('duration'); }
  get imagelink() { return this.form?.get('imagelink'); }
  get about() { return this.form?.get('about'); }

  resetToInitialValues(): void {
    this.initForm();
  }

  close(): void {
    this.closeWithMessage(null);
  }

  private closeWithMessage(message: String | null): void {
    this.dialogRef.close(message);
  }

  editMovie(): void {
    let updatedMovieWithoutId: Movie = this.form?.value;
    let updatedMovieWithId: Movie = this.mergeMovieWithId(updatedMovieWithoutId);
    this.service.update(this.data, updatedMovieWithId).subscribe(
      (movie: Movie) => {
        this.closeWithMessage('Succesfully updated movie');
      },
      (error: HttpErrorResponse) => {
        console.error('Something went wrong with updating movie with id ' + this.data, error);
        this.closeWithMessage('Failed to update movie');
      }
    );
  }

  private mergeMovieWithId(movie: Movie): Movie {
    movie.id = this.data;
    return movie;
  }

}
