import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  static apiBaseUrl = 'http://localhost:8080/api/';

  constructor() { }

  ngOnInit(): void { }
}
