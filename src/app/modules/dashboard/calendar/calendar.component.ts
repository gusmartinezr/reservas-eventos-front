import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EspaciosService } from '../../../services/espacios/espacios.service';
import { ReservasService } from '../../../services/reservas/reservas.service';
import { FullCalendarModule } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin],
    events: [],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
  };

  constructor(private reservaService: ReservasService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  // Método para cargar los eventos desde el servicio
  loadEvents(): void {
    this.reservaService.getReservas().subscribe(
      (reservas: any[]) => {
        console.log(reservas);

        // Mapear las reservas a un formato que FullCalendar entienda
        const eventos = reservas.map((reserva) => ({
          title: reserva.nombre_evento,
          start: reserva.fecha_inicio,
          end: reserva.fecha_fin,
          color: reserva.disponible ? 'green' : 'red',
        }));
        this.calendarOptions.events = eventos;
      },
      (error) => {
        console.error('Error al cargar las reservas:', error);
      }
    );
  }
}
