import { Component, inject } from '@angular/core';
import { OrganizationDashboardService } from '../../../core/services/organization-dashboard.service';
import {  ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-organization-home',
  imports: [CommonModule, NgChartsModule],
  templateUrl: './organization-home.component.html',
  styleUrl: './organization-home.component.css'
})
export class OrganizationHomeComponent {
  newVol: number = 0;
  vol : number = 0
  private readonly _OrganizationDashboardService = inject(OrganizationDashboardService)
  grantedCertificatesCount = 0;
    totalVolunteeringHours = 0;
    activeOpportunitiesCount = 0;
    volunteersCount = 0;
  
    public pieChartType:  'pie' = 'pie';
    public pieChartData: ChartData<'pie', number[], string> = {
      labels: ['', '', '','', 'اخري'],
      datasets: [{
        data: [0, 0, 0,0,0] ,
        backgroundColor: ['#8B5CF6', '#F5CBF9', '#A1A6F0', '#E9A1F0','#864FB8']
      }]
    };
  
    public lineChartLabels: string[] = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'];
    public lineChartData: ChartData<'line'> = {
      labels: this.lineChartLabels,
      datasets: [
        { data: [0, 0, 0, 0, 0, 0], label: 'إجمالي المتطوعين', borderColor: '#A1A6F0', tension: 0.4},
        { data: [0, 0, 0, 0, 0, 0], label: ' المتطوعين الجدد' , borderColor: '#8B5CF6', tension: 0.4}
      ]
    };
    public lineChartOptions: ChartConfiguration['options'] = {
      responsive: true,
      maintainAspectRatio: false,
    };
  
    public barChartLabels: string[] = ['المستخدمين', 'المتطوعين', 'المنظمات', 'الفرص', 'الساعات', 'الشهادات', 'التقييمات'];
    public barChartData: ChartData<'bar'> = {
      labels: this.barChartLabels,
      datasets: [
        {
          data: [0, 0, 0, 0, 0, 0],
          barThickness: 65,
          backgroundColor: ['#9333EA','#B675F1', '#A1A6F0', '#E9A1F0', '#797FCB', '#710FCA','#BB85C0']
        },
      ]
    };
    public barChartType: 'bar' = 'bar';
  
    public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
  };
  
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    }
  };
  
    ngOnInit(): void {
      this._OrganizationDashboardService.getHomeStatistics().subscribe((res) => {
        this.grantedCertificatesCount = res.grantedCertificatesCount;
        this.totalVolunteeringHours = res.totalVolunteeringHours;
        this.activeOpportunitiesCount = res.activeOpportunitiesCount;
        this.volunteersCount = res.volunteersCount;
  
        this.getPie();
        this.getLine();
        
       
      });
    }
    getPie() {
  this._OrganizationDashboardService.getPieStatistics().subscribe((res) => {
    const sorted = res.sort((a: any, b: any) => b.percentage - a.percentage);

    const topFour = sorted.slice(0, 4);

    const others = sorted.slice(4);
    const othersPercentage = others.reduce((sum: number, item: any) => sum + item.percentage, 0);

  
    const labels = topFour.map((item: any) => item.category);
    const data = topFour.map((item: any) => item.percentage);

    labels.push('أخرى');
    data.push(othersPercentage);

    this.pieChartData = {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: ['#8B5CF6', '#F5CBF9', '#A1A6F0', '#E9A1F0', '#864FB8']
      }]
    };
  });
}

getLine() {
  let newVolTemp: number = 0;
  let volTemp: number = 0;

  this._OrganizationDashboardService.GetNewVolunteersPercentage().subscribe({
    next: (value) => {
      newVolTemp = value.percentage;
      checkAndSet();
    },
  });

  this._OrganizationDashboardService.GetVolunteersPercentage().subscribe({
    next: (value) => {
      volTemp = value.percentage;
      checkAndSet();
    },
  });

  const checkAndSet = () => {
    if (newVolTemp !== 0 && volTemp !== 0) {
      const steps = 6;
      const generateSteps = (total: number) => {
        const arr = [];
        for (let i = 1; i <= steps; i++) {
          arr.push(parseFloat((total * (i / steps)).toFixed(2)));
        }
        return arr;
      };

      this.lineChartData = {
        labels: this.lineChartLabels,
        datasets: [
          {
            data: generateSteps(volTemp),
            label: 'إجمالي المتطوعين',
            borderColor: '#A1A6F0',
            backgroundColor: 'transparent',
            fill: false,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 0,
            pointStyle: 'line'
          },
          {
            data: generateSteps(newVolTemp),
            label: 'المتطوعين الجدد',
            borderColor: '#8B5CF6',
            backgroundColor: 'transparent',
            fill: false,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 0,
            pointStyle: 'line'
          }
        ]
      };
    }
  };
}


}
