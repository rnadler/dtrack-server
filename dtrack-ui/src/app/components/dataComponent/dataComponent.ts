import { Component } from '@angular/core';
import { DataService } from '../../services/dataService'


@Component({
    selector: 'data',
    templateUrl: './dataComponent.html'
})

export class DataComponent {
    public data: any;
    constructor(private dataService: DataService) {
    }

    private ngOnInit() {
        this.getData();
    }

    private getData() {
        this.dataService.getData(null)
            .subscribe(
                data => {
                    this.data = data;
                },
                error => {
                    console.error("Failed to get data! " + error)
                }
            );
    }
}