import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  static apiBaseUrl = 'https://perfi.akosborn.com/api/';

  constructor() { }

  ngOnInit(): void { }
}
