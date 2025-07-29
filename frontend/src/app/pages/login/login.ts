import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin() {
    if (!this.loginData.email || !this.loginData.password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido!', response);
      
        localStorage.setItem('authToken', response.token);

        alert('Login realizado com sucesso!');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Erro no login:', error);
        alert(`Erro no login: ${error.error.message || 'Email ou senha inválidos.'}`);
      }
    });
  }
}
