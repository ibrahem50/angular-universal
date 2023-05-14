import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { NormalRequestService } from './services/normal-request.service';
import { environment } from 'src/environments/environment';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ssr-poc';
  filters: { title: string }[] = [{ title: '' }];
  units: { unit_id: string }[] = [];
  constructor(
    private normalRequest: NormalRequestService,
    private tstate: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    //if you need to do it in server
    this.normalRequest
      .getSlugs({
        slug: '/en/buy/apartments',
      })
      .subscribe((res: any) => {
        let keyState = makeStateKey<any>('slug');
        this.tstate.set(keyState, res);
        this.filters = res.children;
      });
  }

  onSearch() {
    //if you need to do it in browser
    if (isPlatformBrowser(this.platformId)) {
      this.normalRequest
        .getFilters({
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
        })
        .subscribe((res: any) => {
          let keyState = makeStateKey<any>(`unit${res.id}`);
          this.tstate.set(keyState, res);
          this.units = res.units;
        });
    }
  }
}
