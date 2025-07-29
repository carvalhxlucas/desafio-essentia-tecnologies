import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  registerData = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onRegister(): void {
    if (!this.registerData.email || !this.registerData.password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        console.log('Registro realizado com sucesso:', response);
        alert('Conta criada com sucesso! Você será redirecionado para o login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erro ao registrar:', err);
        alert(`Erro no registro: ${err.error.message || 'Tente novamente.'}`);
      }
    });
  }
}
