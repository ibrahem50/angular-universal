import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ssr-poc';
  filters: { title: string }[] = [{ title: '' }];
  units: { unit_id: string }[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .post(`${environment.backendUrl}/seo/slug`, {
        slug: '/en/buy/apartments',
      })
      .subscribe((res: any) => {
        this.filters = res.children;
      });
  }

  onSearch() {
    this.http
      .post(
        `${environment.backendUrl}/v1/resources/map/filter
      `,
        {
          config: {
            pageNumber: 1,
            itemCount: 12,
            lang: 2,
          },
          query: {
            sortBy: '',
            sortDirection: '',
            '': [],
          },
        }
      )
      .subscribe((res: any) => {
        this.units = res.units;
      });
  }
}
