import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Profile } from '../interfaces/profile.intetface';
import { apiConstants } from '../../constants/api.url';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

 http=inject(HttpClient);

  getTestAccounts(){
   return this.http.get<Profile[]>(apiConstants.testAccount)
  }
}
