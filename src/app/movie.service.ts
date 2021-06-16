import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private endpoint: string = "http://localhost:8080";
  private resource: string = this.endpoint + "/movies";

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.resource);
  }

  get(id: number): Observable<Movie> {
    return this.http.get<Movie>(this.resource + '/' + id);
  }

  create(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.resource, movie);
  }

  update(id: number, movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(this.resource + "/" + id, movie);
  }

  delete(id: number) {
    return this.http.delete(this.resource+ "/" + id);
  }

}
