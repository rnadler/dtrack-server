import { Component, Output, EventEmitter} from '@angular/core';
import { DataService } from '../../services/dataService'


@Component({
    selector: 'add-entry',
    templateUrl: './addEntry.html'
})

export class AddEntry {

    public entry = {
        type: null,
        value: null,
        createdDateTime: null,
        user: null
    };
    private successAlert = {type: 'success', message: 'Data was successfully added!'};
    private failedAlert = {type: 'danger', message: 'Failed to add data!'};
    @Output() onMessage = new EventEmitter<any>();

    constructor(private dataService: DataService) {
    }

    submit() {
        this.entry.createdDateTime = AddEntry.getDateTime();
        this.entry.user = '';
        console.log("AddEntry submit: " + JSON.stringify(this.entry));
        this.dataService.addEntry(this.entry)
            .subscribe(
                data => {
                    console.log("Entry added successfully! " + JSON.stringify(data));
                    this.onMessage.emit(this.successAlert);
                },
                error => {
                    console.error("Failed to add data! " + error);
                    this.onMessage.emit(this.failedAlert);
                }
            );
    }

    private static getDateTime() {
        let currentdate = new Date();
        return currentdate.getFullYear() + '-' +
            AddEntry.pad2(currentdate.getMonth()+1)  + '-' +
            AddEntry.pad2(currentdate.getDate()) + 'T' +
            AddEntry.pad2(currentdate.getHours()) + ':' +
            AddEntry.pad2(currentdate.getMinutes()) + ':' +
            AddEntry.pad2(currentdate.getSeconds()) + '.' +
            AddEntry.pad(currentdate.getMilliseconds(), 3);
    }
    private static pad(n, width) {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    }
    private static pad2(n) {
        return AddEntry.pad(n, 2);
    }
}