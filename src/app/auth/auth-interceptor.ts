import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {TokenProviderService} from './token-provider.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenProvider: TokenProviderService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('Hime hime, hime, suki suki daisuki hime, hime, kira kira ri,');
    const authReq = req.clone({headers: req.headers.set('x-access-token', this.tokenProvider.token)});
    //const authReq = req.clone({headers: req.headers.set('Authorization', this.auth.token)});
    return next.handle(authReq);
  }
}
