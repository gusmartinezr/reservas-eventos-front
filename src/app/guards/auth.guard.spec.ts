import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'isAuthenticated',
    ]);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard, // Asegúrate de que AuthGuard esté disponible para las pruebas
        { provide: AuthService, useValue: authServiceSpy }, // Proporciona un espía de AuthService
        provideRouter([]), // Proporciona el enrutador para las pruebas
        provideHttpClientTesting(), // Proporciona HttpClientTesting
      ],
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should navigate to login if not authenticated', (done) => {
    authService.isAuthenticated.and.returnValue(of(false));
    spyOn(router, 'navigate');

    guard.canActivate().subscribe((result) => {
      expect(result).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
      done();
    });
  });

  it('should allow activation if authenticated', (done) => {
    authService.isAuthenticated.and.returnValue(of(true));

    guard.canActivate().subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
  });
});
