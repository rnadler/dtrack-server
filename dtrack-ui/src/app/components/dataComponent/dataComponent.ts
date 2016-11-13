import { Component, ViewChild } from '@angular/core';
import { DataService } from '../../services/dataService'
import { LogAlert } from "../logAlert/logAlert";


@Component({
    selector: 'data',
    templateUrl: './dataComponent.html'
})

export class DataComponent {
    public data: any;
    constructor(private dataService: DataService) {
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
                },
                error => {
                    this.logAlert.showAlert(this.failedAlert);
                    console.error("Failed to load data! " + error)
                }
            );
    }
}