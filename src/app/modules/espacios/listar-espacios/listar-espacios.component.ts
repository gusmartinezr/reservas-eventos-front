import { Component, OnInit } from '@angular/core';
import { SHARED_PRIMENG_IMPORTS } from '../../../shared/primeng-imports';
import { EspaciosService } from '../../../services/espacios/espacios.service';
import { CrearEspacioComponent } from '../crear-espacio/crear-espacio.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-listar-espacios',
  templateUrl: './listar-espacios.component.html',
  standalone: true,
  imports: [...SHARED_PRIMENG_IMPORTS, CrearEspacioComponent],
  providers: [MessageService],
})
export class ListarEspaciosComponent implements OnInit {
  espacios: any[] = [];
  displayModal: boolean = false;

  constructor(
    private espaciosService: EspaciosService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.cargarEspacios();
  }

  cargarEspacios(): void {
    this.espaciosService.getEspacios().subscribe(
      (data) => (this.espacios = data),
      (error) => console.error('Error al cargar los espacios', error)
    );
  }
  showModalDialog() {
    this.displayModal = true;
  }
  onEspacioCreado() {
    this.displayModal = false;
    this.cargarEspacios();
  }

  eliminarEspacio(id: number) {
    this.espaciosService.deleteEspacio(id).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Espacio eliminado exitosamente',
        });
        this.cargarEspacios();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el espacio',
        });
        console.error('Error al eliminar el espacio', error);
      }
    );
  }
}
