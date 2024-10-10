import { Routes } from '@angular/router';
import { RegistroComponent } from './modules/auth/registro/registro.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { ListarEspaciosComponent } from './modules/espacios/listar-espacios/listar-espacios.component';
import { ListarReservasComponent } from './modules/reservas/listar-reservas/listar-reservas.component';
import { DashboardComponent } from './modules/dashboard/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard'; // Importar el guard

export const routes: Routes = [
  // Rutas públicas
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },

  // Rutas protegidas con el guard
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'espacios',
    component: ListarEspaciosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reservas',
    component: ListarReservasComponent,
    canActivate: [AuthGuard],
  },

  // Redirección por defecto
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
