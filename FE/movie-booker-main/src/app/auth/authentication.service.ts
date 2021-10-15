import { MovieService } from './../@shared/services/movie.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Credentials, CredentialsService } from './credentials.service';

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private credentialsService: CredentialsService, private movieService: MovieService) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(body: any): Observable<object> {
    // Replace by proper authentication call
    // const data: Credentials = {
    //   username: context.username,
    //   token: '123456',
    //   role: 2,
    // };
    return this.movieService.login(body);
  }

  setCredintials(credentials?: Credentials) {
    this.credentialsService.setCredentials(credentials);
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCredintials();
    return of(true);
  }
}
