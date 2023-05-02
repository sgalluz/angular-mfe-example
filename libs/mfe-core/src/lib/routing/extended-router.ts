import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, firstValueFrom } from 'rxjs';
import { NavigationBehaviorOptions, Router, UrlTree } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExtendedRouter {

  public static readonly BASE_PATH_KEY: string = 'BASE_PATH';
  private static readonly APP_STANDALONE_ROOT_PATH: string = '/';

  private _basePath: BehaviorSubject<string> = new BehaviorSubject('');
  private readonly basePath$: Observable<string> = this._basePath.asObservable();

  constructor(private readonly router: Router) { }

  public asMicroFrontend = (url: string = ExtendedRouter.APP_STANDALONE_ROOT_PATH) => this._basePath.next(url);

  public buildUrlTree(url: string): Observable<UrlTree> | UrlTree {
    if (this._basePath?.value === ExtendedRouter.APP_STANDALONE_ROOT_PATH) {
      return this.router.parseUrl(url);
    }

    const result = new Subject<UrlTree>();

    this.basePath$
      .pipe(
        filter(url => !!url?.length),
        map(baseUrl => this.router.parseUrl(`${baseUrl}/${url}`))
      )
      .subscribe(urlTree => result.next(urlTree));

    return result.asObservable();
  }

  public navigateTo(url: string | UrlTree | Observable<UrlTree>,
                    extras?: NavigationBehaviorOptions): Promise<boolean> {

    if (url instanceof Observable<UrlTree>) {
      const navigationResult: Subject<boolean> = new Subject<boolean>();
      url.subscribe(urlTree => this.navigateByUrl(urlTree, extras)
        .then(result => navigationResult.next(result))
        .catch(reason => {
          console.error(`Unable to navigate to the selected UrlTree: ${urlTree}\n`, reason);
          navigationResult.next(false);
        }));
      return firstValueFrom(navigationResult);
    }

    return this.navigateByUrl(url, extras);
  }

  private buildUrlTreeSync(url: string | UrlTree): UrlTree {
    if (this._basePath?.value === ExtendedRouter.APP_STANDALONE_ROOT_PATH) {
      return url instanceof String ? this.router.parseUrl(<string>url) : <UrlTree>url;
    }

    if (url instanceof String) {
      return this.router.parseUrl(`${this._basePath?.value || ''}/${url}`);
    }

    // TODO handle url tree without parent context
    return <UrlTree>url;
  }

  private navigateByUrl = (url: string | UrlTree, extras?: NavigationBehaviorOptions): Promise<boolean> =>
    this.router.navigateByUrl(this.buildUrlTreeSync(url), extras);

}
