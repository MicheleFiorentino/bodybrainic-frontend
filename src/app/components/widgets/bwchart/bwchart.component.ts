import { Component, OnInit, ViewChild, OnChanges, ElementRef, Input, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { BWElectrodeArray } from './utils/bwelectrode-array';
import { Electrode } from './utils/electrode.model';

@Component({
  selector: 'app-bwchart',
  templateUrl: './bwchart.component.html',
  styleUrls: ['./bwchart.component.css']
})
export class BwchartComponent implements OnInit, OnChanges{

  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef;
  @Input() chartTitle?: string;
  @Input() chartData: number[][] = [];
  @Input() chartElectrodeArray: BWElectrodeArray = new BWElectrodeArray;

  public brainWavesChart?: Chart;

  ngOnInit(): void {
    this.renderBWChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData']) {
      this.updateChartData();
    }
  }

  renderBWChart(){
    const xValues = Array.from({ length: 1024 }, (_, i) => i + 1); // Generate an array of integers from 1 to 1024


    this.brainWavesChart = new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: xValues,
        datasets: [
          {
            label: 'F3',
            data: this.chartData[0],
            borderWidth: 0.5,
            pointRadius: 0
          },
          {
            label: 'FC5',
            data: this.chartData[1],
            borderWidth: 0.5,
            pointRadius: 0
          },
          {
            label: 'AF3',
            data: this.chartData[2],
            borderWidth: 0.5,
            pointRadius: 0
          },
          {
            label: 'F7',
            data: this.chartData[3],
            borderWidth: 0.5,
            pointRadius: 0
          },
          {
            label: 'T7',
            data: this.chartData[4],
            borderWidth: 0.5,
            pointRadius: 0
          },
          {
            label: 'P7',
            data: this.chartData[5],
            borderWidth: 0.5,
            pointRadius: 0
          },
          {
            label: 'O1',
            data: this.chartData[6],
            borderWidth: 0.5,
            pointRadius: 0
          },
          {
            label: 'O2',
            data: this.chartData[7],
            borderWidth: 0.5,
            pointRadius: 0
          },
          {
            label: 'P8',
            data: this.chartData[8],
            borderWidth: 0.5,
            pointRadius: 0
          },
          {
            label: 'T8',
            data: this.chartData[9],
            borderWidth: 0.5,
            pointRadius: 0
          },
          {
            label: 'F8',
            data: this.chartData[10],
            borderWidth: 0.5,
            pointRadius: 0
          },
          {
            label: 'AF4',
            data: this.chartData[11],
            borderWidth: 0.5,
            pointRadius: 0
          },
          {
            label: 'FC6',
            data: this.chartData[12],
            borderWidth: 0.5,
            pointRadius: 0
          },
          {
            label: 'F4',
            data: this.chartData[13],
            borderWidth: 0.5,
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend:{
            display:false,
          },
          title: {
            display: true,
            text: this.chartTitle
          }
        },
        scales: {
          x : {
            display: false,
            title: {
              display: true,
              text: 'Time (8s)'
            },
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Power (normalized)'
            },
            suggestedMin: 0,
            suggestedMax: 1
          }
        }
      }
    })
  }

  updateChartData(){
    if( !(this.brainWavesChart == null) ){
      for(let i=0; i< this.brainWavesChart!.data.datasets.length; i++){
        this.brainWavesChart!.data.datasets[i].data = this.chartData[i];
      }
      this.brainWavesChart?.update();
    }
  }

  updateChartLinesVisibility(){
    this.brainWavesChart?.update();
  }

}
