import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  static apiBaseUrl = 'http://142.93.5.41:8081/api/';

  constructor() { }

  ngOnInit(): void { }
}
