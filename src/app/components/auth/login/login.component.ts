import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading: boolean = false;
  email: string = '';
  password: string = '';


  constructor(
    private router: Router,
    private authService: AuthService
  ){}

  ngOnInit(): void {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        this.router.navigate(['/doctor-info']);
      },
      error => {
        // Handle login error here
        console.error('Login failed:', error);
      }
    );
  }
}
