import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CrearEspacioComponent } from './crear-espacio.component';

import { ReactiveFormsModule } from '@angular/forms';
import { EspaciosService } from '../../../services/espacios/espacios.service';

describe('CrearEspacioComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        CrearEspacioComponent,
      ],
      providers: [EspaciosService],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CrearEspacioComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
