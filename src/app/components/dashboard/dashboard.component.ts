import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  chartTitle: string = 'Alpha Waves - Rest';
  chartData: number[] = [0.1, .6, .3, .2, .5]; // Example chart data
}
