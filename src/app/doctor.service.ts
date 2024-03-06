import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor, Token, User } from './models';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from './environnement';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  // inscription_patient
  addDoctor(doctor: Doctor): Observable<Doctor> {
    console.log(doctor);
    return this.http.post<Doctor>(environment.doctorInscription, doctor, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getToken(user: User): Observable<Token> {
    return this.http.post<Token>(environment.token, user, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getTheLoggedInDoctor(token: Token): Observable<Doctor> {
    return this.http.get<Doctor>(environment.getDoctorFromToken, this.makeHeader(token))
      .pipe(
        catchError(this.handleError)
      );
  }

  makeHeader(token: Token){
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':`Bearer ${token.access}`})
    };
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
