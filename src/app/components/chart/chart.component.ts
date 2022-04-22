import { Component, OnInit } from '@angular/core';
import { IIPC } from 'src/app/models/ipc.interface';
import { ConsumerService } from 'src/app/services/consumer/consumer.service';
import { environment } from 'src/environments/environment';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  ipcList: IIPC[];

  salesData: ChartData<'line'>;

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: false,
        text: 'IPC',
      },
    },
    scales: {
      yAxes: {
          title: {
              display: true,
              text: "Price",
              font: {
                  size: 15
              }
          },
          ticks: {
              precision: 0
          }
      },
      xAxes: {
          title: {
              display: true,
              text: "Date",
              font: {
                  size: 15
              }
          }
      }
    }
  };

  constructor(private consumerService:ConsumerService) {
   
   }

  ngOnInit(): void {
    this.consumerService.get(environment.urlApi).subscribe((ipcs:IIPC[])=>{
      this.ipcList = ipcs;
      this.generateTable()
    });
  }
  generateTable(){
this.salesData =  {
  labels: this.ipcList.map((ipc)=>ipc.date.split("T")[0]) ,
  datasets: [
    { label: 'Price', data:this.ipcList.map((ipc)=>ipc.price), tension: 0.5 },
  ],
  
};
  }

}
