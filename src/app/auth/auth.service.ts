import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  singup(email: string, password: string) {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDIPx6E6NiZ5G_lHJk3ICwsjh99aCqMd8o';
    const body = {
      email,
      password,
      returnSecureToken: true
    }

    return this.http
      .post<AuthResponseData>(url, body)
      .pipe(
        catchError(errorResponse => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(() => new Error(errorMessage));
          }
          switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email exists already!';
          }
          return throwError(() => new Error(errorMessage));
        })
      )
  }
}
