import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import {  ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { Component, inject } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-admin-home',
  imports: [CommonModule, NgChartsModule],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
  private readonly _AdminService = inject(AdminService);

  totalHours = 0;
  activeOpportunities = 0;
  totalOrganizations = 0;
  totalVolunteers = 0;

  public pieChartType:  'pie' = 'pie';
  public pieChartData: ChartData<'pie', number[], string> = {
    labels: ['الفرص النشطة', 'المنظمات', 'المتطوعين'],
    datasets: [{
      data: [0, 0, 0] ,
      backgroundColor: ['#8B5CF6', '#F5CBF9', '#A1A6F0']
    }]
  };

  public lineChartLabels: string[] = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'];
  public lineChartData: ChartData<'line'> = {
    labels: this.lineChartLabels,
    datasets: [
      { data: [0, 0, 0, 0, 0, 0], label: 'إجمالي المتطوعين', borderColor: '#A1A6F0', tension: 0.4},
      { data: [0, 0, 0, 0, 0, 0], label: 'إجمالي المنظمات' , borderColor: '#8B5CF6', tension: 0.4}
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
    this._AdminService.getHomeStatistics().subscribe((res) => {
      this.totalHours = res.totalHours;
      this.activeOpportunities = res.activeOpportunities;
      this.totalOrganizations = res.totalOrganizations;
      this.totalVolunteers = res.totalVolunteers;

      this.pieChartData = {
        labels: ['الفرص النشطة', 'المنظمات', 'المتطوعين'],
        datasets: [
          {
            data: [
              res.activityDistribution.opportunities,
              res.activityDistribution.organizations,
              res.activityDistribution.volunteers,
            ],
            backgroundColor: ['#8B5CF6', '#F5CBF9', '#A1A6F0']
          },
        ],
      };

      this.lineChartData = {
        labels: res.monthlyUserGrowth.map((item: any) => item.month),
        datasets: [
          {
      data: res.monthlyUserGrowth.map((item: any) => item.count),
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
      data: res.monthlyUserGrowth.map((item: any) => item.count / 5),
      label: 'إجمالي المنظمات',
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
      this._AdminService.getchartStatistics().subscribe({
        next:(res) =>{
        this.barChartData = {
        labels: this.barChartLabels,
        datasets: [
          {
            data: [
              res.users,
              res.volunteers,
              res.organizations,
              res.opportunities,
              res.totalHours,
              res.certificates,
              res.reviews,
            ],
            barThickness: 65,
            backgroundColor: ['#9333EA','#B675F1', '#A1A6F0', '#E9A1F0', '#797FCB', '#710FCA','#BB85C0']
          },
        ],
      };
        },
      })
    });
  }
}