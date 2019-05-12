import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../shared/payment.service';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'app-repayment',
  templateUrl: './repayment.component.html',
  styleUrls: ['./repayment.component.css']
})
export class RepaymentComponent implements OnInit {

  constructor(private paymentService: PaymentService) { }

  public plan: any;

  public paymentData: Array<any>;

  // lineChart
  public lineChartData: Array<any>;
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    lineTension: 0.1,
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(57,106,177,0.4)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(218,124,48,0.4)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(62,150,81,0.4)',
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

        this.buildPaymentChart(plan);
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
    console.log(this.lineChartData);
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
      graphData.lineTension = 0;
      data.push(graphData);
    }
    return data;
  }

  private buildLabelList(plan: any): Array<any> {
    const labels: string[] = [];
    let months = 0;
    for (const schedule of plan.schedules) {
      months = (schedule.paymentRecords.length > months) ? schedule.paymentRecords.length : months;
    }

    const endDate: Moment = moment().add(months, 'month');
    const date: Moment = moment();
    while (date.isSameOrBefore(endDate)) {
      labels.push(date.format('MMM \'YY'));
      date.add(1, 'month');
    }
    return labels;
  }

  private buildPaymentChart(plan: any): void {
    this.paymentData = this.mapPaymentData(plan);
    this.lineChartLabels = this.buildLabelList(plan);
  }

  private mapPaymentData(plan: any): Array<any> {
    const data = [];
    for (const schedule of plan.schedules) {
      const graphData = {} as any;
      graphData.data = [];
      for (const payment of schedule.paymentRecords) {
        graphData.data.push(payment.paymentAmount.toFixed(2));
      }
      graphData.label = schedule.account.name;
      graphData.lineTension = 0;
      data.push(graphData);
    }
    return data;
  }
}
