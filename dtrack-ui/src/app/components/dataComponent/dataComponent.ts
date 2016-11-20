import { Component, ViewChild } from '@angular/core';
import { DataService } from '../../services/dataService'
import { LogAlert } from "../logAlert/logAlert";

@Component({
    selector: 'data',
    templateUrl: './dataComponent.html'
})
export class DataComponent {
    public data: any;
    public chartOptions: any;
    private chart: any;
    constructor(private dataService: DataService) {
        this.chartOptions = {
            chart: {
                type: 'line',
                zoomType: 'x'
            },
            title: { text: '' },
            xAxis: { type: 'datetime' },
            series: [{ name: '', color: 'black', data: [] }]
        };
    }

    @ViewChild(LogAlert) logAlert: LogAlert;
    private successAlert = {type: 'success', message: ''};
    private failedAlert = {type: 'danger', message: 'Failed to load data!'};

    private ngOnInit() {
        this.getData();
    }

    private getData() {
        this.dataService.getData(null)
            .subscribe(
                data => {
                    let length = data === null ? 0 : data.length;
                    this.successAlert.message = 'Successfully loaded ' + length + ' data items.';
                    this.logAlert.showAlert(this.successAlert);
                    this.data = data;
                    this.loadChartValues();
                },
                error => {
                    this.logAlert.showAlert(this.failedAlert);
                    console.error("Failed to load data! " + error)
                }
            );
    }
    private static compare(a, b) {
        if (a[0] < b[0])
            return -1;
        else if (a[0] > b[0])
            return 1;
        else
            return 0;
    }
    saveInstance(chartInstance) {
        console.log("DataComponent: loaded chart instance.");
        this.chart = chartInstance;
    }
    private loadChartValues() {
        var i,
            values = [],
            seriesName =  'All';
        for (i = 0; i < this.data.length; i++) {
            values.push([Date.parse(this.data[i].createdDateTime), parseFloat(this.data[i].value)]);
        }
        values.sort(DataComponent.compare);
        let series = this.chart.series[0];
        for (i = 0; i < this.data.length; i++) {
            series.addPoint(values[i]);
        }
        series.name = seriesName;
        this.chart.zoomOut();
    };
}