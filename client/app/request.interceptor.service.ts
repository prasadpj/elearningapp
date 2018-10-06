import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { ClientRegisterService } from './services/client-service/client-register.service';

// Put regular expression of routes that should not have Authorization header e.g. third party apis, login routes
// It is needed to put FULL route including host
/* const bypassURLs: Array<string> = [
    `${environment.apiBase}/api/sessions/logout`
]; */

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private _clientRegisterService: ClientRegisterService, private _router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this._clientRegisterService.getToken()}`,
                'auth': 'true',
                'token': this._clientRegisterService.getToken()
            }
        });
        return next.handle(request).do((event: HttpEvent<any>) => { }, (error: any) => {
            if (error instanceof HttpErrorResponse) {
                if (error.status === 401) {
                    this._router.navigate(['/login']);
                } else if (error.status === 500) {
                    console.log(error); // redirect to error page
                    this._router.navigate(['/servererror']);
                } else if (error.status === 404) {
                    this._router.navigate(['/pagenotfound']);
                }
            }
        });

    }

}