import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importar Router para la redirección

import { MessageService } from 'primeng/api';
import { SHARED_PRIMENG_IMPORTS } from '../../../shared/primeng-imports';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  standalone: true,
  imports: [...SHARED_PRIMENG_IMPORTS],
  providers: [MessageService],
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router // Inyectar Router para la navegación
  ) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  register(): void {
    if (this.registroForm.valid) {
      this.authService.register(this.registroForm.value).subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Registro exitoso',
          });
          // Redirigir a la página de inicio de sesión después de 2 segundos
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        (error) => {
          if (error.status === 422) {
            const validationErrors = error.error.errors;
            for (const field in validationErrors) {
              if (validationErrors.hasOwnProperty(field)) {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error de Validación',
                  detail: validationErrors[field].join(', '),
                });
              }
            }
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo registrar',
            });
          }
        }
      );
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atención',
        detail: 'Formulario inválido',
      });
    }
  }
}
