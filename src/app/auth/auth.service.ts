import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiConstants } from '../constants/api.url';
import { LoginData } from '../data/interfaces/login.interface';
import { TokenResponse } from '../data/interfaces/auth.interface';
import { catchError, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  TOKEN_NAME: string='token';
  REFRESH_TOKEN_NAME:string ='refreshToken';

  http  =inject(HttpClient);
  cookieService = inject(CookieService);
  router = inject(Router);

  token:string | null =null;
  refreshToken:string | null =null;

  get isAuth() { 
   if(!this.token){
    this.token= this.cookieService.get(this.TOKEN_NAME)
    this.refreshToken=  this.cookieService.get(this.REFRESH_TOKEN_NAME)
   }  
    return !!this.token;
  }

  login(payload:LoginData){
    const fd =new FormData()
    fd.append('username', payload.username!)
    fd.append('password', payload.password!)

    return this.http.post<TokenResponse>(apiConstants.authToken, fd)
    .pipe(
      tap(val=> this.saveTokens(val))
    );
  }

  refresh(){
    this.refreshToken= this.refreshToken || this.cookieService.get(this.REFRESH_TOKEN_NAME)
  
    return this.http.post<TokenResponse>(apiConstants.refresh, {
      refresh_token : this.refreshToken
    })
    .pipe(
      
      tap(val=> {
        console.log(val);
        
        this.saveTokens(val)}),
      catchError(er=>{
        console.log(er);
        
         this.logout()
        return throwError(er);
      })
    )
  }

  logout(){
    this.cookieService.deleteAll();
    this.token=null;
    this.refreshToken=null;
    this.router.navigate(['login']);
    this.http.post(apiConstants.logout,{})
    .pipe(
      catchError(er=>{
        console.error(er);
        return throwError(er);        
      })
    )
  }

  saveTokens(res:TokenResponse){    
    this.token=res.access_token;
    this.refreshToken=res.refresh_token;
    
    this.cookieService.set(this.TOKEN_NAME, this.token);
    this.cookieService.set(this.REFRESH_TOKEN_NAME, this.refreshToken);
  }
}
