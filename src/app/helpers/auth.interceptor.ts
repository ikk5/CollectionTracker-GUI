import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

const baseUrl = 'http://localhost:8080/api/'

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apiReq = req.clone({
            url: baseUrl + req.url,
            withCredentials: true
        });

        return next.handle(apiReq);
    }
}

export const httpInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
];
