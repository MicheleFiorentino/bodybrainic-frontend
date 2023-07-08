import { Component, ViewChild, OnInit} from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

enum BrainWaves {
  DELTA,
  THETA,
  ALPHA,
  BETA,
  GAMMA
}

const intFirstRowActive = 0;
const intLastRowActive = 1023;
const intFirstRowRest = 1024;
const intLastRowRest = 2047;

const genericStartRow = 0;
const genericLastRow = 1023;  //both active and rest files have 1024 rows
const intFirstCol = 0;        //both active and rest
const intLastCol = 139;       //both active and rest

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
      this.eegDataActive = this.extractEEGData(file, intFirstRowActive, intLastRowActive);
      this.eegDataRest = this.extractEEGData(file, intFirstRowRest, intLastRowRest);
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
    console.log(this.chartDataRest)
  }

  //there are 5 bandwidth intercepted by 14 electrodes.
  //each row is a measurement of an istant, for 128 measurment in a second, for 8 seconds (1024 measurments)
  //the columns from 1 to 140 are the electrodes measurments, 70 mean (what we want) and 70 standard deviation (not interesting)
  //we have to filter only the means, and divide them by the 5 bandwidths
  extractEEGData(eegFile: string, intFirstRow: number, intLastRow: number): number[][][]{
    let eegData: number[][][] = [];

    //extracting from the csv file only the means (we descard the std deviation) and reducing the columns to desired ones
    let eegFileMeans: string = this.filterFileMeans(eegFile, intFirstRow, intLastRow);

    //from the refined file, we get 5 files. Each file is a different bandwidth
    let deltaFile = this.getBandWidthFileData(eegFileMeans, BrainWaves.DELTA, genericStartRow, genericLastRow);
    let thetaFile = this.getBandWidthFileData(eegFileMeans, BrainWaves.THETA, genericStartRow, genericLastRow);
    let alphaFile = this.getBandWidthFileData(eegFileMeans, BrainWaves.ALPHA, genericStartRow, genericLastRow);
    let betaFile = this.getBandWidthFileData(eegFileMeans, BrainWaves.BETA, genericStartRow, genericLastRow);
    let gammaFile = this.getBandWidthFileData(eegFileMeans, BrainWaves.GAMMA, genericStartRow, genericLastRow);

    //We convert each bandwith (that is a string) in an array of numbers. Each element represents a different electrode
    eegData.push(this.convertBandWidthFileToNumberArrays(deltaFile));
    eegData.push(this.convertBandWidthFileToNumberArrays(thetaFile));
    eegData.push(this.convertBandWidthFileToNumberArrays(alphaFile));
    eegData.push(this.convertBandWidthFileToNumberArrays(betaFile));
    eegData.push(this.convertBandWidthFileToNumberArrays(gammaFile));

    return eegData;
  }

  //the means are the pair columns, we get only the first 70 values
  filterFileMeans(eegFile: string, intFirstRow: number, intLastRow: number): string {
    let rowsArray = eegFile.split('\n'); // Split the file into rows

    // Extract the desired rows within the specified range
    let desiredRows = rowsArray.slice(intFirstRow, intLastRow + 1);

    let eegFileMeans: string = '';

    let pairsColumnArray = [];
    for (let row of desiredRows) {
      let columnArray = row.split(','); // Split each row into columns
      let desiredColumns = columnArray.slice(intFirstCol, intLastCol + 1); // Extract the desired columns

      for (let j = 0; j < desiredColumns.length; j += 2) {
        pairsColumnArray.push(desiredColumns[j]);
      }

      let rowMeans = pairsColumnArray.join(',');
      eegFileMeans += rowMeans + '\n';
      pairsColumnArray = []; // Clear the array for the next row
    }
    return eegFileMeans;
  }

  //in the csv file (without the std deviation) we have in sequence, for each electrode, the 5 bandwidth.
  //in order they are DELTA, THETA, ALPHA, BETA, GAMMA. So, each 5 camps refers to the same electrode. The next 5 to another, and so on.
  //Extracting the index from the enum, we can get the right index from each bandwith (0 for DELTA, 1 for THETA, ...) moving at each iteration
  //5 times forward.
  getBandWidthFileData(eegFile: string, bwchart: BrainWaves, intFirstRow: number, intLastRow: number) : string{
    let rowsArray = eegFile.split('\n'); // Split the file into rows
    let waveIdx = bwchart;

    // Extract the desired rows within the specified range
    let desiredRows = rowsArray.slice(intFirstRow, intLastRow + 1);

    let bandwidthFile: string = '';

    let pairsColumnArray = [];
    for (let row of desiredRows) {
      let columnArray = row.split(','); // Split each row into columns

      for (let j = waveIdx; j < columnArray.length; j += 5) {
        pairsColumnArray.push(columnArray[j]);
      }

      let rowMeans = pairsColumnArray.join(',');
      bandwidthFile += rowMeans + '\n';
      pairsColumnArray = []; // Clear the array for the next row
    }
    return bandwidthFile;
  }

  //nb: right now, in a file we have the Hz on the
  convertBandWidthFileToNumberArrays(bandwidthFile: string): number[][] {
    const rows: string[] = bandwidthFile.split('\n');
    const data: number[][] = [];

    // Initialize an array for each column
    for (let i = 0; i < 14; i++) {
      data.push([]);
    }

    for (const row of rows) {
      const cols: string[] = row.split(',');

      // Iterate over each column and push the value to the corresponding column array
      for (let i = 0; i < 14; i++) {
        const value: number = parseFloat(cols[i]);
        if (!isNaN(value)) {
          data[i].push(value);
        }
      }
    }

    return data;
  }


  updateEEGSubtitle(bwtype: BrainWaves){
    this.subtitleEEG = BrainWaves[bwtype].concat(' waves');
  }

}
