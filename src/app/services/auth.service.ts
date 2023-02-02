import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string = 'Vas-y passe';

  getToken(): string {
    return this.token;
  }
}
