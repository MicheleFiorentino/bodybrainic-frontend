import { Component, OnInit, ViewChild, OnChanges, ElementRef, Input, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-bwchart',
  templateUrl: './bwchart.component.html',
  styleUrls: ['./bwchart.component.css']
})
export class BwchartComponent implements OnInit, OnChanges{

  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef;
  @Input() chartTitle?: string;
  @Input() chartData: number[] = [];

  public brainWavesChart?: Chart;

  ngOnInit(): void {
    this.renderBWChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData']) {
      this.updateChart();
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
            label: 'EF',
            data: this.chartData,
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          title: {
            display: true,
            text: this.chartTitle
          }
        },
        scales: {
          x : {
            display: true,
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

  updateChart(){
    if( !(this.brainWavesChart == null) ){
      this.brainWavesChart!.data.datasets[0].data = this.chartData;
      this.brainWavesChart?.update();
    }
  }

}
