import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { ErrorHandler, Inject, Injectable, Injector } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements ErrorHandler {

  constructor(@Inject(Injector) private readonly injector: Injector) {
  }
  handleError(err) {
    this.toastrService.error(err, null, { onActivateTick: true })

    return throwError(err);

  }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError(this.handleError)
      )
  };



  /**
   * Need to get ToastrService from injector rather than constructor injection to avoid cyclic dependency error
   * @returns {} 
   */
  private get toastrService(): ToastrService {
    return this.injector.get(ToastrService);
  }

}
