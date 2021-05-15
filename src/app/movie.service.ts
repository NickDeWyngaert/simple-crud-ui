import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private endpoint: string = "http://localhost:8080";

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.endpoint + "/movies");
  }

  get(id: number): Observable<Movie> {
    return this.http.get<Movie>(this.endpoint + '/movies/' + id);
  }

  create(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.endpoint+ "/movies", movie);
  }

  update(id: number, movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(this.endpoint + "/movies/" + id, movie);
  }

  delete(id: number) {
    return this.http.delete(this.endpoint+ "/movies/" + id);
  }

}
