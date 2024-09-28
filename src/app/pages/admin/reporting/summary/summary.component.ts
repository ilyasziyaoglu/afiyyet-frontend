import {Component, OnInit} from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import Swal from "sweetalert2";
import {Location, NgForOf, NgIf} from "@angular/common";
import {OrderService} from "../../../../services/order.service";
import {Chart, ChartType} from 'chart.js/auto';
import {TableService} from "../../../../services/table.service";

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    MatFormField,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit{
  period: string = 'today';
  protected orderSummary: any;
  protected roundPerTablePerHourValue: string = "0";
  protected restaurantOccupation: number = 0;
  private orderStatisticsChart: Chart<ChartType, any[], string>;
  private bestSellersChart: Chart<ChartType, any, unknown>;
  private topEarnersChart: Chart<ChartType, any, unknown>;
  private hourlyDistribution: Chart<ChartType, any, unknown>;

  constructor(
      public location: Location,
      private orderService: OrderService,
      private tableService: TableService
  ) {
  }

  ngOnInit() {
    this.onPeriodChange();
  }

  onPeriodChange() {
    this.onFilterOrder();
    this.roundPerTablePerHour();
    this.tableService.restaurantOcupation(res => this.restaurantOccupation = res);
    this.getHourlyDistributions();
  }

  onFilterOrder() {
    let startDate = new Date();

    switch (this.period) {
      case 'today': startDate.setDate(startDate.getDate() - 1); break;
      case 'this-week': startDate.setDate(startDate.getDate() - 7); break;
      case 'this-month': startDate.setMonth(new Date().getMonth() - 1); break;
      case 'this-year': startDate.setFullYear(startDate.getFullYear() - 1); break;
    }
    startDate.setHours(4);
    startDate.setMinutes(0);

    let filterReq = {
      startDate,
      endDate: new Date()
    };
    this.orderService.summary(filterReq, res => {
      if (res) {
        this.orderSummary = res;
        this.drawOrderStatistics(res);
        this.drawBestSellers(res.productSummaries);
        this.drawTopEarners(res.productSummaries);
      } else {
        Swal.fire('Hata', 'Sipariş özeti alınırken bir hata oluştu!', 'error');
      }
    });
  }

  drawOrderStatistics(orderSummary: any) {
    var canvasElement = document.getElementById('orderStatisticsChart') as HTMLCanvasElement;
    const ctx = canvasElement.getContext('2d');

    this.orderStatisticsChart ? this.orderStatisticsChart.destroy() : '';
    this.orderStatisticsChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Minimum', 'Ortalama', 'Maksimum'],
        datasets: [
            {
              data: [orderSummary.min, orderSummary.avg, orderSummary.max],
              backgroundColor: '#3498DB',
            }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              display: false
            },
            border: {
              display: false
            },
            grid: {
              display: false,
              drawTicks: false,
            }
          },
          x: {
            border: {
              display: false
            },
            grid: {
              display: false,
              drawTicks: false,
            }
          },
        }
      }
    });
  }

  drawBestSellers(productSummaries: any) {
    productSummaries.sort((p1, p2) => p2.count - p1.count);
    var canvasElement = document.getElementById('bestSellersChart') as HTMLCanvasElement;
    const ctx = canvasElement.getContext('2d');

    this.bestSellersChart ? this.bestSellersChart.destroy() : '';
    this.bestSellersChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: productSummaries.map(ps => ps.name),
        datasets: [
            {
              data: productSummaries.map(ps => ps.count),
              backgroundColor: '#2ECC71',
            }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              display: false
            },
            border: {
              display: false
            },
            grid: {
              display: false,
              drawTicks: false,
            }
          },
          x: {
            border: {
              display: false
            },
            grid: {
              display: false,
              drawTicks: false,
            }
          },
        }
      }
    });
  }

  drawTopEarners(productSummaries: any) {
    productSummaries.sort((p1, p2) => p2.total - p1.total);
    var canvasElement = document.getElementById('topEarnersChart') as HTMLCanvasElement;
    const ctx = canvasElement.getContext('2d');

    this.topEarnersChart ? this.topEarnersChart.destroy() : '';
    this.topEarnersChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: productSummaries.map(ps => ps.name),
        datasets: [
            {
              data: productSummaries.map(ps => ps.total),
              backgroundColor: '#E74C3C',
            }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              display: false
            },
            border: {
              display: false
            },
            grid: {
              display: false,
              drawTicks: false,
            }
          },
          x: {
            border: {
              display: false
            },
            grid: {
              display: false,
              drawTicks: false,
            }
          },
        }
      }
    });
  }

  roundPerTablePerHour() {
    let startDate = new Date();

    switch (this.period) {
      case 'today': startDate.setDate(startDate.getDate() - 1); break;
      case 'this-week': startDate.setDate(startDate.getDate() - 7); break;
      case 'this-month': startDate.setMonth(new Date().getMonth() - 1); break;
      case 'this-year': startDate.setFullYear(startDate.getFullYear() - 1); break;
    }
    startDate.setHours(4);
    startDate.setMinutes(0);

    let filterReq = {
      startDate,
      endDate: new Date()
    };
    this.orderService.roundPerTablePerHour(filterReq, res => {
      if (res || res === 0) {
        this.roundPerTablePerHourValue = parseFloat(res).toFixed(2);
      } else {
        Swal.fire('Hata', 'Masa dönüş hızı alınırken bir hata oluştu!', 'error');
      }
    });
  }

  getHourlyDistributions() {
    let startDate = new Date();

    switch (this.period) {
      case 'today': startDate.setDate(startDate.getDate() - 1); break;
      case 'this-week': startDate.setDate(startDate.getDate() - 7); break;
      case 'this-month': startDate.setMonth(new Date().getMonth() - 1); break;
      case 'this-year': startDate.setFullYear(startDate.getFullYear() - 1); break;
    }
    startDate.setHours(4);
    startDate.setMinutes(0);

    let filterReq = {
      startDate,
      endDate: new Date()
    };
    this.orderService.hourlyDistribution(filterReq, res => {
      if (res || res === 0) {
        this.drawHourlyDistribution(res)
      } else {
        Swal.fire('Hata', 'Masa dönüş hızı alınırken bir hata oluştu!', 'error');
      }
    });
  }

  drawHourlyDistribution(hourlyDistributionData: any) {
    var canvasElement = document.getElementById('hourlyDistribution') as HTMLCanvasElement;
    const ctx = canvasElement.getContext('2d');

    this.hourlyDistribution ? this.hourlyDistribution.destroy() : '';
    this.hourlyDistribution = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [...Array(24).keys()],
        datasets: [
          {
            data: [...Array(24).keys()].map(hour => hourlyDistributionData[hour] ? hourlyDistributionData[hour].length : 0),
            backgroundColor: '#8E44AD',
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              display: false
            },
            border: {
              display: false
            },
            grid: {
              display: false,
              drawTicks: false,
            }
          },
          x: {
            border: {
              display: false
            },
            grid: {
              display: false,
              drawTicks: false,
            }
          },
        }
      }
    });
  }

}
