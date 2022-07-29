import { routes } from './client-lib-routing.module';
import { Location } from '@angular/common';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppComponent } from '../../../../apps/client/src/app/app.component';
import { BggSearchService } from './shared/services/bgg-search/bgg-search.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider } from 'angular-oauth2-oidc';
import { GoogleAuthService } from './google-login/GoogleAuth/google-auth.service';
// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { ScriptService } from './shared/services/scripts/script.service';
import { ModelsService } from './shared/services/models/models.service';
// import { GoogleAuthService } from './google-login/GoogleAuth/google-auth.service';
// class TestHttpRequestInterceptor implements HttpInterceptor {
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//       return new Observable<any>(observer => {
//         observer.next({} as HttpEvent<any>);
//       })
//   }
// }
describe('Router: Module', () => {

    let location: Location;
    let router: Router;
    let fixture;

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query =>({
        matches: false,
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [RouterTestingModule.withRoutes(routes),HttpClientTestingModule],
        providers: [BggSearchService,GoogleAuthService,OAuthService,UrlHelperService,OAuthLogger,DateTimeProvider,ScriptService,ModelsService],
        declarations: [AppComponent]
    });
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    router.initialNavigation();
  });


  it('navigate to "home" redirects you to /home', fakeAsync(() => {
      router.navigate(['home']);
      tick();
      expect(location.path()).toBe('/home');
  }));

  it('navigate to "board-game-search" redirects you to /board-game-search', fakeAsync(() => {
      router.navigate(['board-game-search']);
      tick();
      expect(location.path()).toBe('/board-game-search');
  }));
  it('navigate to "login" redirects you to /login',() => {
    router.navigate(['login']);
    expect(location.path()).toBe('/');
  });

  it('navigate to "collections" redirects you to /collections',fakeAsync(() => {
    router.navigate(['collections']);
    tick();
    expect(location.path()).toBe('/collections');
  }));

  it('navigate to "addGame" redirects you to /addGame',fakeAsync(() => {
    router.navigate(['addGame']);
    tick();
    expect(location.path()).toBe('/addGame');
  }));

  it('navigate to "admin" redirects you to /admin',fakeAsync(() => {
    router.navigate(['admin']);
    tick();
    expect(location.path()).toBe('/admin');
  }));

  it('navigate to "script-detail" redirects you to /script-detail',fakeAsync(() => {
    router.navigate(['script-detail']);
    tick();
    expect(location.path()).toBe('/script-detail');
  }));
  
  it('navigate to "viewCollection" redirects you to /viewCollection',fakeAsync(() => {
    router.navigate(['viewCollection']);
    tick();
    expect(location.path()).toBe('/viewCollection');
  }));

  it('navigate to "scripts" redirects you to /scripts',fakeAsync(() => {
    router.navigate(['scripts']);
    tick();
    expect(location.path()).toBe('/scripts');
  }));

  it('navigate to "gameSessions" redirects you to /gameSessions',fakeAsync(() => {
    router.navigate(['gameSessions']);
    tick();
    expect(location.path()).toBe('/gameSessions');
  }));

  it('navigate to "session" redirects you to /session',fakeAsync(() => {
    router.navigate(['session']);
    tick();
    expect(location.path()).toBe('/session');
  }));

  it('navigate to "models" redirects you to /models',fakeAsync(() => {
    router.navigate(['models']);
    tick();
    expect(location.path()).toBe('/models');
  }));

  // it('navigate to "executor" redirects you to /executor',fakeAsync(() => {
  //   router.navigate(['executor']);
  //   tick();
  //   expect(location.path()).toBe('/executor');
  // }));

});