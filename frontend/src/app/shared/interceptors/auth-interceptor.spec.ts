import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { authInterceptor } from './auth-interceptor';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('authInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) => 
    TestBed.runInInjectionContext(() => authInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
