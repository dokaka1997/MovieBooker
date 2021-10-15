import { CredentialsService } from '@app/auth';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, UntilDestroy, untilDestroyed } from '@core';
import { AuthenticationService } from './authentication.service';
import { Role } from './credentials.service';

const log = new Logger('Login');

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  login() {
    if (this.loginForm.valid) {
      const login$ = this.authenticationService.login(this.loginForm.value);
      login$
        .pipe(
          finalize(() => {
            this.loginForm.markAsPristine();
            this.isLoading = false;
          }),
          untilDestroyed(this)
        )
        .subscribe(
          (credentials: any) => {
            log.debug(`${credentials.name} successfully logged in`);
            this.authenticationService.setCredintials(credentials);
            switch (credentials.role) {
              case Role.user:
                this.router.navigate(['/movies'], { replaceUrl: true });
                break;
              case Role.staff:
                this.router.navigate(['/staff'], { replaceUrl: true });
                break;
              case Role.admin:
                this.router.navigate(['/admin'], { replaceUrl: true });
                break;
            }
          },
          (error) => {
            log.debug(`Login error: ${error}`);
            this.error = error;
          }
        );
    }
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true,
    });
  }
}
