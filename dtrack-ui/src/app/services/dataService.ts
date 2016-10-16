import { Injectable } from "@angular/core";
import { MyHttpService } from "./myHttpService";
import { Response } from "@angular/http";

@Injectable()
export class DataService {
    constructor(private myhttp: MyHttpService) { }

    getData(search: string) {
        let typeSearch = '';
        if (search && search.length > 0) {
            typeSearch = '/type/' + search;
        }
        return this.myhttp.get('/api/v1/entries' + typeSearch)
            .map((res: Response) => res.json());
    }
}
