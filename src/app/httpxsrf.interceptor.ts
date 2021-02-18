import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpXsrfTokenExtractor } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class HttpXsrfInterceptor implements HttpInterceptor {

    constructor(private tokenExtractor: HttpXsrfTokenExtractor, private authenticationService: AuthenticationService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headerName = 'X-CSRF-TOKEN';
        let token = this.tokenExtractor.getToken() as string;
        if (token !== null && !req.headers.has(headerName)) {
            req = req.clone({ headers: req.headers.set(headerName, token) });
        }

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let data: any = {};
                data = {
                    reason: error && error.error ? error.error : '',
                    status: error.status
                };
                if (data['status'] === 403) {
                    this.authenticationService.logout()
                }
                return throwError(error)
            })
        ) 
    }
}
