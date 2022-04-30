import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class BaseService {
    public baseUrl: string;
    constructor(private http: HttpClient) {
        this.baseUrl = environment.baseUrl;
    }

    public get<T>(path: string) {
        return this.http.get<T>(`${this.baseUrl}${path}`);
    }

    public post<T>(path: string, body: any) {
        return this.http.post<T>(`${this.baseUrl}${path}`, body);
    }

    public put<T>(path: string, body: any) {
        return this.http.put<T>(`${this.baseUrl}${path}`, body);
    }

    public delete<T>(path: string) {
        return this.http.delete<T>(`${this.baseUrl}${path}`);
    }

    public patch<T>(path: string, body: any) {
        return this.http.patch<T>(`${this.baseUrl}${path}`, body);
    }
}
