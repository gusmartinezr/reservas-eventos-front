import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CalendarComponent } from './calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ReservasService } from '../../../services/reservas/reservas.service';
import { of } from 'rxjs';

describe('CalendarComponent', () => {
  let component: CalendarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FullCalendarModule, CalendarComponent],
      providers: [ReservasService],
    }).compileComponents();

    const fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load events', () => {
    const reservaService = TestBed.inject(ReservasService);
    spyOn(reservaService, 'getReservas').and.returnValue(of([]));

    component.loadEvents();
    expect(reservaService.getReservas).toHaveBeenCalled();
  });
});
