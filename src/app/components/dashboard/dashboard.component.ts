import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  chartTitle: string[] = [
    'Alpha Waves - Active',
    'Alpha Waves - Rest',
    'Beta Waves - Active',
    'Beta Waves - Rest',
    'Gamma Waves - Active',
    'Gamma Waves - Rest',
    'Theta Waves - Active',
    'Theta Waves - Rest',
    'Delta Waves - Active',
    'Delta Waves - Rest',
  ];
  chartData: number[] = [0.1, .6, .3, .2, .5]; // Example chart data
}
