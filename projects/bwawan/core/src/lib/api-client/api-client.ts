import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core'

@Injectable()
export class ApiClient {
  constructor(
    private httpClient: HttpClient,
    @Inject('BASE_URL')
    private baseUrl: string) { }

  get = <T>(uri: string) => this.httpClient.get<T>(this.baseUrl + uri)
  post = <T>(uri: string, body: any) => this.httpClient.post<T>(this.baseUrl + uri, body)
}
