import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { timeout } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable()
export class ApiService {
  url: string = environment.serverUrl;
  // authenUrl: string = environment.authenUrl;
  timeout = 10000;
  token: any;

  // tslint:disable-next-line:variable-name
  constructor(private _http: HttpClient, public injector: Injector) {}

  get(pEndpoint: string, pOptions?: any, pHeaders?: any) {
    let headers = new HttpHeaders();
    let params = new HttpParams();

    let dHeaders = this.buildCommonHeader();

    if (pOptions) {
      Object.keys(pOptions).forEach((key) => {
        params = params.append(key, pOptions[key]);
      });
    }

    if (pHeaders) {
      dHeaders = Object.assign(pHeaders, dHeaders);
    }

    Object.keys(dHeaders).forEach((key) => {
      headers = headers.append(key, dHeaders[key]);
    });

    return this._http.get(this.url + '/' + pEndpoint, { headers, params }).pipe(timeout(this.timeout));
  }

  // public doRefreshToken(endpoint: string, refreshToken: string) {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
  //       Authorization: 'Basic ' + btoa(`${environment.clientId}:${environment.clientSecret}`),
  //       'Access-Control-Allow-Origin': '*',
  //     }),
  //   };
  //   const creds = new URLSearchParams();
  //   creds.set('grant_type', 'refresh_token');
  //   creds.set('refresh_token', refreshToken);
  //   return this._http.post(`${environment.authenUrl}/${endpoint}`, creds.toString(), httpOptions);
  // }

  post(pEndpoint: string, pBody?: any, pOptions?: any, pHeaders?: any) {
    let headers = new HttpHeaders();
    let params = new HttpParams();

    let dHeaders = this.buildCommonHeader();

    if (pOptions) {
      Object.keys(pOptions).forEach((key) => {
        params = params.append(key, pOptions[key]);
      });
    }

    if (pHeaders) {
      dHeaders = Object.assign(pHeaders, dHeaders);
    }

    Object.keys(dHeaders).forEach((key) => {
      headers = headers.append(key, dHeaders[key]);
    });

    return this._http.post(this.url + '/' + pEndpoint, pBody, { headers, params }).pipe(timeout(this.timeout));
  }

  put(endpoint: string, body?: any, pOptions?: any, pHeaders?: any) {
    let headers = new HttpHeaders();
    let params = new HttpParams();

    let dHeaders = this.buildCommonHeader();

    if (pOptions) {
      Object.keys(pOptions).forEach((key) => {
        params = params.append(key, pOptions[key]);
      });
    }

    if (pHeaders) {
      dHeaders = Object.assign(pHeaders, dHeaders);
    }

    Object.keys(dHeaders).forEach((key) => {
      headers = headers.append(key, dHeaders[key]);
    });

    return this._http.put(this.url + '/' + endpoint, body, { headers, params }).pipe(timeout(this.timeout));
  }

  patch(endpoint: string, body?: any, pOptions?: any, pHeaders?: any) {
    let headers = new HttpHeaders();
    let params = new HttpParams();

    let dHeaders = this.buildCommonHeader();

    if (pOptions) {
      Object.keys(pOptions).forEach((key) => {
        params = params.append(key, pOptions[key]);
      });
    }

    if (pHeaders) {
      dHeaders = Object.assign(pHeaders, dHeaders);
    }

    Object.keys(dHeaders).forEach((key) => {
      headers = headers.append(key, dHeaders[key]);
    });
    return this._http.patch(this.url + '/' + endpoint, body, { headers, params }).pipe(timeout(this.timeout));
  }

  delete(endpoint: string, pOptions?: any, pHeaders?: any): Observable<any> {
    let headers = new HttpHeaders();
    let params = new HttpParams();

    let dHeaders = this.buildCommonHeader();

    if (pOptions) {
      Object.keys(pOptions).forEach((key) => {
        params = params.append(key, pOptions[key]);
      });
    }

    if (pHeaders) {
      dHeaders = Object.assign(pHeaders, dHeaders);
    }

    Object.keys(dHeaders).forEach((key) => {
      headers = headers.append(key, dHeaders[key]);
    });

    return this._http.delete(this.url + '/' + endpoint, { headers, params }).pipe(timeout(this.timeout));
  }

  // getUserToken(endpoint: string, username: string, password: string) {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //       // Authorization: 'Basic ' + btoa(`${environment.clientId}:${environment.clientSecret}`),
  //     }),
  //   };
  //   const creds = 'grant_type=password&username=' + username + '&password=' + password;
  //   return this._http.post<any>(this.authenUrl + '/' + endpoint, creds, httpOptions).pipe(timeout(this.timeout));
  // }

  // postDownload(pEndpoint: string, pBody?: any) {
  //   const headers = this.buildCommonHeader();
  //   return this._http
  //     .post(`${environment.apiUrl}/${pEndpoint}`, pBody, {
  //       headers,
  //       observe: 'response',
  //       responseType: 'arraybuffer',
  //     })
  //     .pipe(timeout(this.timeout));
  // }

  private buildCommonHeader() {
    // const accessToken = localStorage.getItem(STORAGE_KEY.access_token);
    // if (accessToken) {
    //   const translate = this.injector.get(TranslateService);
    //   let lang = '';
    //   if (!translate) {
    //     lang = translate.currentLang;
    //   }
    //   lang = localStorage.getItem(STORAGE_KEY.currentLanguage);
    //   if (!lang) {
    //     lang = environment.defaultLanguage;
    //   }
    //   if (!lang) {
    //     lang = '';
    //   }
    //   return {
    //     Authorization: 'Bearer ' + accessToken,
    //     'Access-Control-Allow-Origin': '*',
    //     'Accept-Language': lang,
    //   };
    // } else {
    return {};
    // }
  }
}
