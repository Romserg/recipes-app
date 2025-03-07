import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Subject, tap, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { User } from "./user.model";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new Subject<User>()

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
        tap(responseData => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          )
        }),
        catchError(this.handleError)
      )
  }

  login(email: string, password: string) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`;
    const body = {
      email,
      password,
      returnSecureToken: true
    }

    return this.http
      .post<AuthResponseData>(url, body)
      .pipe(
        tap(responseData => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          )
        }),
        catchError(this.handleError)
      )
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const user = new User(
      email,
      userId,
      token,
      new Date(new Date().getTime() + expiresIn * 1000)
    )
    this.user.next(user);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already!';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'This password or email is not correct!';
        break;
      case 'USER_DISABLED':
        errorMessage = 'This user is disabled!';
    }
    return throwError(() => new Error(errorMessage));
  }
}
