import { Component, ViewChild} from '@angular/core';

enum BrainWaves {
  ALPHA,
  BETA,
  GAMMA,
  THETA,
  DELTA
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{

  chartTitleActive: string = 'Active';
  chartTitleRest: string = 'Rest';
  subtitleEEG = "Alpha waves";
  chartDataActive: number[] = [0.1, .6, .3, .2, .5]; // Example chart data
  chartDataRest: number[] = [0.3, .4, .1, .4, .2]; // Example chart data

  constructor(){}

  BrainWaves = BrainWaves;


  // BUTTON UPDATING CHARTS

  onUpdateEEG(bwtype: BrainWaves){
    console.log(bwtype);
    this.updateEEGDataCharts();
    //updateEEGSubtitle();
  }

  //TODO
  //Get CSV File, divide the 5 brainwaves into 5 array.
  //With a switch, select the right array.

  updateEEGDataCharts(){
    this.chartDataActive = [0.2, .1, .7, .9, .1];
    this.chartDataRest = [0.2, .1, .7, .9, .1];
    console.log(this.chartDataActive);
  }

}
