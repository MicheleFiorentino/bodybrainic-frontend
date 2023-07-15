import { Component, ViewChild, OnInit} from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { BrainWaves } from '../widgets/bwchart/utils/brainwaves.enum';
import { extractActiveEEGData, extractRestEEGData } from '../widgets/bwchart/utils/bwchart.helper';
import { BWElectrodeArray } from '../widgets/bwchart/utils/bwelectrode-array';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  BrainWaves = BrainWaves;
  eegDataActive: number[][][] = []    //1: Bandwith, 2: electrode, 3: Hz -> value
  eegDataRest: number[][][] = []
  chartTitleActive: string = 'Active';
  chartTitleRest: string = 'Rest';
  chartElectrodeArray: BWElectrodeArray = new BWElectrodeArray;

  subtitleEEG = '';
  chartDataActive: number[][] = []
  chartDataRest: number[][] = []

  constructor(
    private dbService: DashboardService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getEEGData();
  }


  //GET BRAIWAVES DATA OF PATIENT FROM CSV, INIT

  getEEGData(): void{
    this.dbService.getEEGRawDataFile()
    .subscribe(file => {
      this.eegDataActive = extractActiveEEGData(file);
      this.eegDataRest = extractRestEEGData(file);
      this.onUpdateEEG(BrainWaves.DELTA);
    });
  }


  // BUTTON UPDATING CHARTS

  onUpdateEEG(bwtype: BrainWaves){
    this.updateEEGDataCharts(bwtype);
    this.updateEEGSubtitle(bwtype);
  }

  updateEEGDataCharts(bwtype: BrainWaves){
    this.chartDataActive = this.eegDataActive[bwtype];
    this.chartDataRest = this.eegDataRest[bwtype];
  }


  updateEEGSubtitle(bwtype: BrainWaves){
    this.subtitleEEG = BrainWaves[bwtype].concat(' waves');
  }


  // get custom chip colors for electrode chip
  getChipStyles(color: string) {
    return {
      'background-color': color,
      'color': '#ffffff' // Replace with the desired text color for custom chips
    };
  }

  // TOGGLE ELECTRODES WAVES IN CHART

  toggleElectrode(elName: string){
    this.chartElectrodeArray.toggleElectrodeVisibility(elName);
  }


  // ROUTING

  navigateToBWDetails(){
    this.router.navigate(['/patient-brainwaves-details'])
  }

}
