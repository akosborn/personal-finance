import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../shared/payment.service';

@Component({
  selector: 'app-repayment',
  templateUrl: './repayment.component.html',
  styleUrls: ['./repayment.component.css']
})
export class RepaymentComponent implements OnInit {

  constructor(private paymentService: PaymentService) { }

  public plan: any;

  // lineChart
  public lineChartData: Array<any>;
  // public lineChartData: Array<any> = [
  //   {data: [5268, 5135, 5001, 4730], label: 'Series A'},
  //   {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
  //   {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'},
  //   {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  // ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // grey
      backgroundColor: 'rgba(141,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  ngOnInit() {
    this.plan = this.paymentService.getPlan();
    this.paymentService.planSubject.subscribe(
      (plan: any) => {
        this.plan = plan;
        this.buildChart(plan);
      }
    );
  }

  public randomize(): void {
    const _lineChartData: Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  private buildChart(plan: any) {
    this.lineChartData = this.mapData(plan);
    this.lineChartLabels = this.buildLabelList(plan);
  }

  private mapData(plan: any): Array<any> {
    const data = [];
    for (const schedule of plan.schedules) {
      const graphData = {} as any;
      graphData.data = [];
      for (const payment of schedule.paymentRecords) {
        graphData.data.push(payment.balance.toFixed(2));
      }
      graphData.label = schedule.account.name;
      data.push(graphData);
    }
    return data;
  }

  private buildLabelList(plan: any): Array<any> {
    const monthMap: Map<number, string> = new Map([
      [1, 'Jan'], [2, 'Feb'], [3, 'Mar'], [4, 'Apr'],
      [5, 'May'], [6, 'Jun'], [7, 'Jul'], [8, 'Aug'],
      [9, 'Sep'], [10, 'Oct'], [11, 'Nov'], [12, 'Dec']
    ]);
    const labels: string[] = [];
    let months = 0;
    for (const schedule of plan.schedules) {
      months = (schedule.paymentRecords.length > months) ? schedule.paymentRecords.length : months;
    }
    console.log('Max months: ' + months); // ToDo: Remove
    const date = new Date();
    const years = Math.floor(months / 12);

    let year = date.getFullYear();
    for (let i = 1; i <= years; i++) {
      year += 1;
      for (let month = 1; month <= 12; month++) {
        labels.push(monthMap.get(month) + ' `' + year.toString().substr(2, 3));
      }
    }
    console.log(labels); // ToDo: Remove
    return labels;
  }
}
