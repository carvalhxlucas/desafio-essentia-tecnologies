import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
