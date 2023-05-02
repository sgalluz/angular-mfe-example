import { Injectable } from '@angular/core';
import { SharedMap } from './shared-map';

@Injectable({
  providedIn: 'root'
})
export class MfeDataService {

  public getSharedMap = (): SharedMap => SharedMap.getInstance();

}
