import { Component, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { CrearReservaComponent } from '../crear-reserva/crear-reserva.component';
import { ReservasService } from '../../../services/reservas/reservas.service';
import { SHARED_PRIMENG_IMPORTS } from '../../../shared/primeng-imports';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-listar-reservas',
  standalone: true,
  imports: [CommonModule, CrearReservaComponent, SHARED_PRIMENG_IMPORTS],
  templateUrl: './listar-reservas.component.html',
  styleUrls: ['./listar-reservas.component.css'],
  providers: [MessageService],
})
export class ListarReservasComponent implements OnInit {
  displayModal: boolean = false;
  reservas = [];

  constructor(
    private reservasService: ReservasService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas() {
    this.reservasService.getReservas().subscribe(
      (data) => (this.reservas = data),
      (error) => console.error('Error al cargar las reservas', error)
    );
  }

  showModalDialog() {
    this.displayModal = true;
  }

  onReservaCreada() {
    this.displayModal = false;
    this.cargarReservas();
  }
  eliminarReserva(id: number) {
    this.reservasService.deleteReserva(id).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Reserva eliminada exitosamente',
        });
        this.cargarReservas();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la reserva',
        });
        console.error('Error al eliminar la reserva', error);
      }
    );
  }
}
