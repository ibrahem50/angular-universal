import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SsrRequestService {
  private isServer = false;

  constructor(
    private tstate: TransferState,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isServer = isPlatformServer(platformId);
  }

  checkAndGetData(key: string, observable: Observable<any>) {
    let keyState = makeStateKey<any>(key);
    if (this.tstate.hasKey(keyState) && !this.isServer) {
      return of(this.tstate.get(keyState, []));
    } else {
      return observable;
    }
  }
}
