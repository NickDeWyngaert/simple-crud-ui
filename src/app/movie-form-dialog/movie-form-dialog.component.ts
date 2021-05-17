import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Movie } from '../movie';

@Component({
  selector: 'app-movie-form-dialog',
  templateUrl: './movie-form-dialog.component.html',
  styleUrls: ['./movie-form-dialog.component.css']
})
export class MovieFormDialogComponent implements OnInit {

  form: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MovieFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Movie
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

  close() {
    this.dialogRef.close();
  }

  addMovie() {
    this.dialogRef.close(this.form.value);
  }

}
