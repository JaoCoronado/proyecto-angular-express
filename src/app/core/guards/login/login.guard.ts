import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../../services/login/login.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const loginGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  return loginService.validateToken().pipe(
    tap((isAutenticado) => {
      if (!isAutenticado) {
        router.navigateByUrl('/');
      }
    })
  );
};
