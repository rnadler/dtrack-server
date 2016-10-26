import { Injectable } from "@angular/core";
import { MyHttpService } from "./myHttpService";
import {Response, RequestOptions, Headers} from "@angular/http";

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

    addEntry(entry: any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions( {headers: headers} );

        return this.myhttp.post('/api/v1/entries', JSON.stringify(entry), options)
            .map((res: Response) =>  {});
    }
}
