import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiConstants } from '../constants/api.url';
import { LoginData } from '../data/interfaces/login.interface';
import { TokenResponse } from '../data/interfaces/auth.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http : HttpClient =inject(HttpClient);

  token:string | null =null;
  refreshToken:string | null =null;

  get isAuth() {return !!this.token;}

  login(payload:LoginData){
    const fd =new FormData()
    fd.append('username', payload.username!)
    fd.append('password', payload.password!)

    return this.http.post<TokenResponse>(apiConstants.authToken, fd)
    .pipe(
      tap(val=>{
          this.token=val.access_token;
          this.refreshToken=val.refresh_token;
      })
    );
  }
}
