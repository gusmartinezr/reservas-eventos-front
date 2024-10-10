import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { SHARED_PRIMENG_IMPORTS } from '../../../shared/primeng-imports';
import { EspaciosService } from '../../../services/espacios/espacios.service';

@Component({
  selector: 'app-crear-espacio',
  templateUrl: './crear-espacio.component.html',
  standalone: true,
  imports: [...SHARED_PRIMENG_IMPORTS],
  providers: [MessageService],
})
export class CrearEspacioComponent implements OnInit {
  @Output() espacioCreado = new EventEmitter<void>();
  espacioForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private espaciosService: EspaciosService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.espacioForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: [''],
      capacidad: [null, [Validators.required, Validators.min(1)]],
    });
  }

  crearEspacio(): void {
    if (this.espacioForm.valid) {
      this.espaciosService.createEspacio(this.espacioForm.value).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Espacio creado',
          });
          this.espacioCreado.emit();
          this.espacioForm.reset();
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo crear el espacio',
          });
        }
      );
    }
  }
}
