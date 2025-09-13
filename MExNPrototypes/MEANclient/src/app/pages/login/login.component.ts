import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error: string | null = null;
  loading = false;

  constructor(private api: ApiService, private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.error = null;
    this.loading = true;
    this.api.login(this.email, this.password).subscribe({
      next: (res: any) => {
        this.auth.login(res.token);
        this.router.navigate(['/']); // Redirect to homepage after login
      },
      error: (err) => {
        this.error = err.error.error || 'Login failed.';
        this.loading = false;
      }
    });
  }
}
