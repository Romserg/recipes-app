import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { environment } from "../../environments/environment";

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

  singUp(email: string, password: string) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`;
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
