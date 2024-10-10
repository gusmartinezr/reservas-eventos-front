import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SHARED_PRIMENG_IMPORTS } from '../../../shared/primeng-imports';
import { ReservasService } from '../../../services/reservas/reservas.service';
import { EspaciosService } from '../../../services/espacios/espacios.service';

@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  standalone: true,
  imports: [...SHARED_PRIMENG_IMPORTS],
  providers: [MessageService],
})
export class CrearReservaComponent implements OnInit {
  @Output() reservaCreada = new EventEmitter<void>();
  reservaForm!: FormGroup;
  espacios: any[] = [];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private reservasService: ReservasService,
    private espaciosService: EspaciosService
  ) {}

  ngOnInit(): void {
    this.reservaForm = this.fb.group(
      {
        espacio_id: ['', Validators.required],
        nombre_evento: ['', Validators.required],
        fecha_inicio: ['', Validators.required],
        fecha_fin: ['', Validators.required],
      },
      { validators: this.fechaInicioMenorQueFechaFin }
    );

    this.cargarEspacios();
  }

  cargarEspacios(): void {
    this.espaciosService.getEspacios().subscribe(
      (data) => {
        this.espacios = data.map((espacio: any) => ({
          label: espacio.nombre,
          value: espacio.id,
        }));
      },
      (error) => {
        console.error('Error al cargar los espacios', error);
      }
    );
  }

  crearReserva(): void {
    if (this.reservaForm.valid) {
      this.reservasService.createReserva(this.reservaForm.value).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Reserva creada exitosamente',
          });
          this.reservaCreada.emit();
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo crear la reserva',
          });
          console.error('Error al crear la reserva', error);
        }
      );
    }
  }

  fechaInicioMenorQueFechaFin(
    control: AbstractControl
  ): ValidationErrors | null {
    const fechaInicio = control.get('fecha_inicio')?.value;
    const fechaFin = control.get('fecha_fin')?.value;

    if (fechaInicio && fechaFin && fechaInicio > fechaFin) {
      return { fechaInicioMayorQueFechaFin: true };
    }
    return null;
  }
}
