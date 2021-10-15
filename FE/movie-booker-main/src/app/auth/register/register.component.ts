import { MovieService } from './../../@shared/services/movie.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private movieService: MovieService) {
    this.initForm();
  }

  register() {
    if (
      this.registerForm.valid &&
      this.registerForm.controls.password.value === this.registerForm.controls.confirmPassword.value
    ) {
      this.movieService.createAccount(this.registerForm.value).subscribe(
        (response) => {
          this.router.navigate(['/login'], { replaceUrl: true });
        },
        (error) => {}
      );
    }
  }

  ngOnInit() {}

  private initForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      role: 1,
      name: ['', Validators.required],
      age: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }
}
