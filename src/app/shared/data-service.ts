import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Auth } from './models/auth';
import { SkyAuthHttp } from '@skyux/http';

@Injectable()
export class DataService {

  private url = 'https://api.particle.io/';

  public skyAuthHeaders: Headers;
  public requestOptions: any;

  constructor(
    private _http: HttpClient,
    private _skyAuthHttp: SkyAuthHttp
  ) {
    this.skyAuthHeaders = new Headers();
    this.skyAuthHeaders.append('Accept', 'application/json');
    this.skyAuthHeaders.append('Content-Type', 'application/json');
    this.skyAuthHeaders.append('Access-Control-Allow-Origin', 'X-Requested-With');
    this.requestOptions = {
      headers: new Headers(this.skyAuthHeaders)
    };
    _skyAuthHttp.options = this.requestOptions;
  }

  public sendMessage(message: string, selectedPhotonId: string, clearDisplay: boolean = false): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
      })
    };
    let preparedMessage = `${localStorage.getItem('USER')}> \n${message}`;
    if (clearDisplay) {
      preparedMessage = '';
    }
    const body = new HttpParams().set('message', preparedMessage);
    return this._http
      .post(`${this.url}v1/devices/${selectedPhotonId}/message`, body, httpOptions);
  }

  public getMessage(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
      })
    };

    return this._http.get(`${this.url}v1/devices/380054000651353530373132/currentMessage`, httpOptions);
  }

  public login(username: string, password: string): Observable<string> {
    let data = `grant_type=password&username=${username}&password=${password}`;
    let base64Auth = btoa('particle:particle');
    let reqHeader = new HttpHeaders();
    reqHeader = reqHeader.append('Content-Type', 'application/x-www-form-urlencoded');
    reqHeader = reqHeader.append('Authorization', `Basic ${base64Auth}`);

    return this._http.post(`${this.url}oauth/token`, data, { headers: reqHeader })
      .map((res: Auth) => res.access_token);
  }

  public getUserInfo(): Observable<any> {

    return this._skyAuthHttp
      .get('https://s21aidnaccnt00blkbapp01.nxt.blackbaud.com/profile', this.requestOptions).map(response => response.json());
  }

  public setAngle(selectedPhotonId: string, angle: number): Observable<any> {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
      })
    };

    const body = new HttpParams().set('message', angle.toString());
    return this._http
      .post(`${this.url}v1/devices/${selectedPhotonId}/requestedAngle`, body, httpOptions);
  }

  public setTurretLights(selectedPhotonId: string, lightStatus: boolean) {
    console.log(lightStatus);

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
      })
    };

    const body = new HttpParams().set('message', lightStatus.toString());
    return this._http
      .post(`${this.url}v1/devices/${selectedPhotonId}/lightStatus`, body, httpOptions);
  }

}
