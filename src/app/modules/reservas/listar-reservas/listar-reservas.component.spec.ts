// listar-reservas.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListarReservasComponent } from './listar-reservas.component';
import { EspaciosService } from '../../../services/espacios/espacios.service';

describe('ListarReservasComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ListarReservasComponent],
      providers: [EspaciosService],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ListarReservasComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
