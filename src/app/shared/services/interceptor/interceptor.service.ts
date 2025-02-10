import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {

  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const prefix = 'http://localhost:9999';

    console.log('Interceptando solicitud:', req);  // Añade este log para verificar

    // Clonar la solicitud y añadir el prefijo a la URL
    let separator = req.url.charAt(0) === '/' ? '' : '/';
    let request = req.clone({
      url: `${prefix}${separator}${req.url}`,
    });

    // Añadir headers si no están presentes
    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
    }

    return next.handle(request).pipe(
      shareReplay(),
      catchError((err: any) => {
        console.error('Error en la solicitud:', err);
        return throwError(err.error);
      })
    );
  }
}
