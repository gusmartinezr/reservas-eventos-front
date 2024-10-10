// espacios.service.spec.ts
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { EspaciosService } from './espacios.service';

describe('EspaciosService', () => {
  let service: EspaciosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EspaciosService],
    });
    service = TestBed.inject(EspaciosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve espacios from the API via GET', () => {
    const dummyEspacios = [
      { id: 1, nombre: 'Espacio 1', capacidad: 50 },
      { id: 2, nombre: 'Espacio 2', capacidad: 100 },
    ];

    service.getEspacios().subscribe((espacios) => {
      expect(espacios.length).toBe(2);
      expect(espacios).toEqual(dummyEspacios);
    });

    const request = httpMock.expectOne(`${service['apiUrl']}/espacios`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyEspacios);
  });

  it('should create an espacio via POST', () => {
    const newEspacio = { id: 3, nombre: 'Espacio 3', capacidad: 200 };

    service.createEspacio(newEspacio).subscribe((espacio) => {
      expect(espacio).toEqual(newEspacio);
    });

    const request = httpMock.expectOne(`${service['apiUrl']}/espacios`);
    expect(request.request.method).toBe('POST');
    request.flush(newEspacio);
  });
});
