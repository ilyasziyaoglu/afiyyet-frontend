import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {UserService} from './user.service';

@Injectable({
    providedIn: 'root',
})
export class HttpService {

    options: any;

    constructor(
        private http: HttpClient,
        private router: Router,
        private userService: UserService
    ) {
    }

    head<T>(url: string, params?: HttpParams): Observable<any> {
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/octet-stream; charset=utf-8')
            .append('Accept', 'application/octet-stream; charset=utf-8');
        return this.http.get<any>(url, {
            params,
            responseType: 'arraybuffer' as 'json',
            observe: 'response' as 'body',
            headers,
        }).pipe(map((response: any) => {
            return response;
        }));
    }

    get<T>(url: string, headers: HttpHeaders, id?: string, params?: HttpParams): Observable<any> {
        return this.http.get<T>(url, {params, headers}).pipe(map((response: any) => {
            return response;
        }));
    }

    post<T>(url: string, body: string, headers: HttpHeaders): Observable<any> {
        return this.http.post<T>(url, body, {headers}).pipe(map((response: any) => {
            return response;
        }));
    }

    put<T>(url: string, body: string, headers: HttpHeaders): Observable<any> {
        return this.http.put<T>(url, body, {headers}).pipe(map((response: any) => {
            return response;
        }));
    }

    delete<T>(url: string, headers: HttpHeaders): Observable<any> {
        return this.http.delete<T>(url, {headers}).pipe(map((response: any) => {
            return response;
        }));
    }

    httpRequest(request: Request) {
        this.doRequest(request.method, request.url, request.data, request.cb);
    }

    doRequest(method: string, path: string, req: any, cb?: any, isFileUpload?) {
        let headers;
        const token = this.userService.getToken();
        if (isFileUpload && token) {
            headers = new HttpHeaders()
                .append('Authorization', token)
                .append('Accept', '*/*');
        } else if (!path.startsWith('auth/') && token) {
            console.log("auth request", token);
            headers = new HttpHeaders()
                .append('Authorization', token)
                .append('Content-Type', 'application/json; charset=utf-8')
                .append('Accept', '*/*');
        } else {
            headers = new HttpHeaders()
                .append('Content-Type', 'application/json; charset=utf-8')
                .append('Accept', '*/*');
        }
        path = environment.baseApiUrl + path;
        let request;
        switch (method) {
            case 'get':
                request = this.get(path, headers);
                break;
            case 'post':
                request = this.post(path, req, headers);
                break;
            case 'put':
                request = this.put(path, req, headers);
                break;
            case 'delete':
                request = this.delete(path, headers);
                break;
        }
        request.subscribe(res => {
            // console.info(path, req, res);
            if (this.isSuccess(res)) {
                if (cb) {
                    cb(res.value);
                }
            } else {
                console.error(res);
                if (cb) {
                    cb(false);
                }
            }
        }, err => {
            if (cb) {
                cb(false);
            } else {
                console.error(err);
            }
        });
    }

    isSuccess(res) {
        return (res.httpStatus === 'OK' || res.httpStatus === 'CREATED' || res.httpStatus === '') && res.success;
    }
}

export enum HttpMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
}

export class Request {
    public method: HttpMethod;
    public url: string;
    public data: any;
    public cb: any;

    constructor() {
    }
}
