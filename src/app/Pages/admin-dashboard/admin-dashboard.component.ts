import {
  Chart,
  registerables,
  ChartConfiguration
} from 'chart.js';
Chart.register(...registerables);

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

import { NgApexchartsModule } from "ng-apexcharts";
import { AdminDashboardService } from '../../Services/admin-dashboard.service';
import { ApexChart, ApexXAxis, ApexAxisChartSeries } from "ng-apexcharts";
import { TherapistResponse } from '../../Models/therapist-response';
import { TherapistService } from '../../Services/therapist.service';
import { ManageUserService } from '../../Services/manage-user.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [NgApexchartsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('barCanvas') barCanvas!: ElementRef;
  @ViewChild('doughnutCanvas') doughnutCanvas!: ElementRef;
  barChart!: Chart;
  doughnutChart!: Chart;

  dashboardData = {
    users: 4,
    bookings: 0
  };

  TherapistList: any[] = [];
  SessionList: number = 0;
  userCount: number = 0;

  readonly barColors = ['#0080FF', '#0c8538', '#748078'];
  readonly doughnutColors = ['#FF6384', '#36A2EB', '#FFCE56'];

  constructor(
    private cdr: ChangeDetectorRef,
    private adminService: AdminDashboardService,
    private therapistService: TherapistService,
    private manageUserService: ManageUserService
  ) {}

  apexBarChartOptions: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    colors: string[];
  } = {
    series: [
      {
        name: 'Count',
        data: [0, 0, 0]
      }
    ],
    chart: {
      type: 'bar',
      // height: 500
    },
    xaxis: {
      categories: ['Users', 'Bookings', 'Therapists']
    },
    colors: this.barColors
  };

  ngOnInit() {
    this.getAllTherapists();
    this.getAllSession();
    this.getUsersCount();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
    this.updateCharts();
  }

  ngOnDestroy(): void {
    if (this.barChart) this.barChart.destroy();
    if (this.doughnutChart) this.doughnutChart.destroy();
  }

  getAllTherapists(): void {
    this.therapistService.getAll().subscribe((response: TherapistResponse) => {
      if (response.isPass) {
        this.TherapistList = response.data;
        this.updateCharts();
      }
    });
  }

  getAllSession(): void {
    this.adminService.getSessions().subscribe((response: any) => {
      if (response.isPass) {
        this.SessionList = response.data.total;
        this.updateCharts();
      }
    });
  }

  getUsersCount(): void {
    this.manageUserService.getUsersCount().subscribe(response => {
      if (response.isPass) {
        this.userCount = response.data;
        this.updateCharts();
      } else {
        console.error('Error fetching user count');
      }
    });
  }

  updateCharts() {
    const users = this.userCount || 0;
    const bookings = this.SessionList || 0;
    const therapists = this.TherapistList.length || 0;

    this.apexBarChartOptions.series = [
      {
        name: 'Count',
        data: [users, bookings, therapists]
      }
    ];

    this.updateBarChart(users, bookings, therapists);
    this.updateDoughnutChart(users, bookings, therapists);
  }

  updateBarChart(users: number, bookings: number, therapists: number) {
    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: ['Users', 'Bookings', 'Therapists'],
        datasets: [
          {
            label: 'Count',
            data: [users, bookings, therapists],
            backgroundColor: this.barColors
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    if (this.barChart) this.barChart.destroy();
    this.barChart = new Chart(this.barCanvas.nativeElement, config);
  }

  updateDoughnutChart(users: number, bookings: number, therapists: number) {
    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: {
        labels: ['Users', 'Bookings', 'Therapists'],
        datasets: [
          {
            data: [users, bookings, therapists],
            backgroundColor: this.doughnutColors
          },
        ],
      },
      options: {
        responsive: true,
      },
    };

    if (this.doughnutChart) this.doughnutChart.destroy();
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, config);
  }
}
