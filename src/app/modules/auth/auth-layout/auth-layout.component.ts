import { Component, OnInit } from '@angular/core';
import packageInfo from 'package.json';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {
  version: string = packageInfo.version;

  constructor() { }

  ngOnInit(): void {
  }

}
