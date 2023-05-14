import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SsrRequestService } from './ssr-request.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NormalRequestService {
  readonly slugReq: string = `${environment.backendUrl}/seo/slug`;
  readonly filterReq: string = `${environment.backendUrl}/v1/resources/map/filter
  `;
  constructor(
    private httpClient: HttpClient,
    private ssrService: SsrRequestService
  ) {}

  postData(endPoint: string, key: string, data: any) {
    const request = this.httpClient.post(endPoint, data);
    return this.ssrService.checkAndGetData(key, request);
  }

  getSlugs(data: any) {
    return this.postData(this.slugReq, 'slug', data);
  }
  getFilters(data: any) {
    return this.postData(this.filterReq, 'filter', data);
  }
}
