import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

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
  }
}
