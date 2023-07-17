import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { BrainWaves } from '../widgets/bwchart/utils/brainwaves.enum';
import { extractActiveEEGData, extractRestEEGData } from '../widgets/bwchart/utils/bwchart.helper';
import { BWElectrodeArray } from '../widgets/bwchart/utils/bwelectrode-array';
import { BwchartComponent } from '../widgets/bwchart/bwchart.component';

@Component({
  selector: 'app-bwdetails',
  templateUrl: './bwdetails.component.html',
  styleUrls: ['./bwdetails.component.css']
})
export class BwdetailsComponent implements OnInit{
  @ViewChild('bwChart', { static: true }) bwChart!: BwchartComponent;

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
    private dbService: DashboardService
  ){}


  ngOnInit(): void {
    this.getEEGData();
  }

  //GET BRAIWAVES DATA OF PATIENT FROM CSV, INIT

  getEEGData(): void{
    this.dbService.getEEGRawDataFile()
    .subscribe(file => {
      this.eegDataActive = extractActiveEEGData(file);
      this.onUpdateEEG(BrainWaves.DELTA);
    });
  }


  // BUTTON UPDATING CHARTS

  onUpdateEEG(bwtype: BrainWaves){
    this.updateEEGDataChart(bwtype);
    this.updateEEGSubtitle(bwtype);
  }

  updateEEGDataChart(bwtype: BrainWaves){
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
    this.bwChart.updateChartVisibility(this.chartElectrodeArray);
  }

}
