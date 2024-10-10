import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListarEspaciosComponent } from './listar-espacios.component';
import { EspaciosService } from '../../../services/espacios/espacios.service';

describe('ListarEspaciosComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ListarEspaciosComponent],
      providers: [EspaciosService],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ListarEspaciosComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
