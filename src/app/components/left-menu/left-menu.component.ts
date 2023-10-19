import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss'],
})
export class LeftMenuComponent implements OnInit {
  opened: boolean = false;

  constructor(private route: Router) {}
  ngOnInit(): void {}

  changeTo(url: string): void {
    this.route.navigate([url]);
    this.opened = !this.opened;
  }
}
