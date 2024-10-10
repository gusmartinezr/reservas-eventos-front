import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

import { MenubarModule } from 'primeng/menubar';
import { SHARED_PRIMENG_IMPORTS } from '../../../shared/primeng-imports';
import { ListarEspaciosComponent } from '../../espacios/listar-espacios/listar-espacios.component';
import { CrearEspacioComponent } from '../../espacios/crear-espacio/crear-espacio.component';
import { ListarReservasComponent } from '../../reservas/listar-reservas/listar-reservas.component';
import { CrearReservaComponent } from '../../reservas/crear-reserva/crear-reserva.component';
import { AuthService } from '../../../services/auth/auth.service';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [
    ...SHARED_PRIMENG_IMPORTS,
    MenubarModule,
    ListarEspaciosComponent,
    CrearEspacioComponent,
    ListarReservasComponent,
    CrearReservaComponent,
    CalendarComponent,
  ],
})
export class DashboardComponent {
  items: MenuItem[] = [];
  selectedMenuItem: string = 'listarEspacios';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Calendario',
        icon: 'pi pi-calendar',
        command: () => (this.selectedMenuItem = 'calendario'),
      },
      {
        label: 'Gestión de Espacios',
        icon: 'pi pi-building',
        items: [
          {
            label: 'Listar Espacios',
            icon: 'pi pi-list',
            command: () => (this.selectedMenuItem = 'listarEspacios'),
          },
        ],
      },
      {
        label: 'Gestión de Reservas',
        icon: 'pi pi-calendar',
        items: [
          {
            label: 'Listar Reservas',
            icon: 'pi pi-list',
            command: () => (this.selectedMenuItem = 'listarReservas'),
          },
        ],
      },
      {
        label: 'Salir',
        icon: 'pi pi-sign-out',
        command: () => this.logout(),
      },
    ];
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
