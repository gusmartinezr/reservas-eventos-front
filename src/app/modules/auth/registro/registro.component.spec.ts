import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegistroComponent } from './registro.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth/auth.service';

describe('RegistroComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RegistroComponent,
      ],
      providers: [AuthService, MessageService],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RegistroComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
