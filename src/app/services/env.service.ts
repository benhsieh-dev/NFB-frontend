import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  constructor() { }

  public backEndBaseUrl = "https://newfullybakery-backend.herokuapp.com"; 
}
