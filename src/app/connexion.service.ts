import { Injectable } from '@angular/core';
import { environment } from './environnement';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Token, User } from './models';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  private backendUrl = environment.backendUrl;
  private tokenUrl = `${this.backendUrl}token/`;  // URL to web api
  

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  getToken(user: User): Observable<Token> {
    return this.http.post<Token>(this.tokenUrl, user, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later. Backend may not respond'));
  }
}
