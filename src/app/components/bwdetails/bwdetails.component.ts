import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { BrainWaves } from '../widgets/bwchart/utils/brainwaves.enum';
import { extractActiveEEGData, extractRestEEGData } from '../widgets/bwchart/utils/bwchart.helper';
import { BWElectrodeArray } from '../widgets/bwchart/utils/bwelectrode-array';
import { BwchartComponent } from '../widgets/bwchart/bwchart.component';

enum ViewType{
  Active,
  Rest
}

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
  chartTitle: string = 'Active';
  chartElectrodeArray: BWElectrodeArray = new BWElectrodeArray;

  subtitleEEG = '';
  chartData: number[][] = []
  selectedView = ViewType.Active;
  selectedBwtype = BrainWaves.DELTA;
  selectedMeasurement: string = 'most recent';

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
      this.eegDataRest = extractRestEEGData(file);
      this.onUpdateEEG(this.selectedBwtype, this.selectedView);
    });
  }


  // BUTTON UPDATING CHARTS

  onUpdateEEG(bwtype: BrainWaves, view: ViewType){
    this.updateEEGDataChart(bwtype, view);
    this.updateEEGSubtitle(bwtype);
  }

  updateEEGDataChart(bwtype: BrainWaves, view: ViewType){
    if(view == ViewType.Active){
      this.chartData = this.eegDataActive[bwtype];
    } else {
      this.chartData = this.eegDataRest[bwtype];
    }
    this.selectedBwtype = bwtype;
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

  // TOGGLE VIEW CHAR (ACTIVE, REST)

  toggleView(){
    if(this.selectedView == ViewType.Active){
      this.selectedView = ViewType.Rest;
      this.chartTitle = 'Rest';
    } else {
      this.selectedView = ViewType.Active;
      this.chartTitle = 'Active';
    }

    this.updateEEGDataChart(this.selectedBwtype, this.selectedView);
    this.bwChart.updateChartTitle(this.chartTitle)
  }

}
