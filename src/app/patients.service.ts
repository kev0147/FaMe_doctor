import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Patient, Token } from './models';
import { environment } from './environnement';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('client:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `server ${error.status}: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened'));
  }

  makeHeader(token: Token){
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':`Bearer ${token.access}`})
    };
  }

  getPatientsOfDoctor(token:Token, doctorId: string): Observable<Patient[]> {
    const url = `${environment.getPatientsOfDoctor}/${doctorId}`;
    return this.http.get<Patient[]>(url, this.makeHeader(token))
      .pipe(
        catchError(this.handleError)
      );
  }

  // GET a single patient by ID
  getPatientById(patientId: string, token:Token): Observable<Patient> {
    const url = `${environment.patients}/${patientId}`;
    return this.http.get<Patient>(url, this.makeHeader(token));
  }

}
