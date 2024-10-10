import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ReservasService } from './reservas.service';

describe('ReservasService', () => {
  let service: ReservasService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Agregar HttpClientTestingModule
      providers: [ReservasService],
    });
    service = TestBed.inject(ReservasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve reservas from the API via GET', () => {
    const dummyReservas = [
      {
        id: 1,
        nombre_evento: 'Evento 1',
        fecha_inicio: '2023-01-01',
        fecha_fin: '2023-01-02',
      },
      {
        id: 2,
        nombre_evento: 'Evento 2',
        fecha_inicio: '2023-02-01',
        fecha_fin: '2023-02-02',
      },
    ];

    service.getReservas().subscribe((reservas) => {
      expect(reservas.length).toBe(2);
      expect(reservas).toEqual(dummyReservas);
    });

    const request = httpMock.expectOne(`${service['apiUrl']}/reservas`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyReservas);
  });

  it('should create a reserva via POST', () => {
    const newReserva = {
      id: 3,
      nombre_evento: 'Evento 3',
      fecha_inicio: '2023-03-01',
      fecha_fin: '2023-03-02',
    };

    service.createReserva(newReserva).subscribe((reserva) => {
      expect(reserva).toEqual(newReserva);
    });

    const request = httpMock.expectOne(`${service['apiUrl']}/reservas`);
    expect(request.request.method).toBe('POST');
    request.flush(newReserva);
  });

  it('should delete a reserva via DELETE', () => {
    const reservaId = 3;

    service.deleteReserva(reservaId).subscribe((response) => {
      expect(response).toEqual({});
    });

    const request = httpMock.expectOne(
      `${service['apiUrl']}/reservas/${reservaId}`
    );
    expect(request.request.method).toBe('DELETE');
    request.flush({});
  });
});
