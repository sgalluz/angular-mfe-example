import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';

@Component({
  selector: 'shell-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) {}

  // TODO remove me!!!
  ngOnInit(): void {
    this.http.get('/api/test/')
      .pipe(tap((v) => console.log('TEST API CALL', v)))
      .subscribe();

    this.http.get('/api/test/two')
      .pipe(tap((v) => console.log('TEST TWO API CALL', v)))
      .subscribe();
  }
}
