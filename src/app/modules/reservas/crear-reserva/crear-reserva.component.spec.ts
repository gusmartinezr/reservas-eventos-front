import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CrearReservaComponent } from './crear-reserva.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ReservasService } from '../../../services/reservas/reservas.service';

describe('CrearReservaComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        CrearReservaComponent,
      ],
      providers: [ReservasService],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CrearReservaComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
