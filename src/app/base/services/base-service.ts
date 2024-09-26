import {HttpMethod, HttpService} from './http.service';

export abstract class BaseService {

    GUEST = '/guest';

    protected constructor(
        private httpService: HttpService,
    ) {
    }

    abstract getBasePath(): string;

    getHttpService(): HttpService {
        return this.httpService;
    }

    get(id, cb): void {
        this.httpService.doRequest(HttpMethod.GET, `${this.getBasePath()}${this.GUEST}/${id}`, '', cb);
    }

    post(request, cb?): void {
        this.httpService.doRequest(HttpMethod.POST, this.getBasePath(), request, cb);
    }

    put(request, cb?): void {
        this.httpService.doRequest(HttpMethod.PUT, this.getBasePath(), request, cb);
    }

    delete(id, cb): void {
        this.httpService.doRequest(HttpMethod.DELETE, `${this.getBasePath()}/${id}`, '', cb);
    }

    getAll(cb): void {
        this.httpService.doRequest(HttpMethod.GET, `${this.getBasePath()}/all`, '', cb);
    }

    filter(filterReq, cb): void {
        let reqParams = "";
        reqParams += "?page=" + (filterReq.page?.pageIndex ? filterReq.page.pageIndex : "0");
        filterReq.page?.pageSize ? reqParams += "&size=" + filterReq.page.pageSize : "";
        filterReq.sort ? reqParams += "&sort=" + filterReq.sort : "";
        filterReq.id ? reqParams += "&id.equals=" + filterReq.id : "";
        filterReq.startDate ? reqParams += "&createdDate.greaterThanOrEqual=" + filterReq.startDate.toISOString() : "";
        filterReq.endDate ? reqParams += "&createdDate.lessThanOrEqual=" + filterReq.endDate.toISOString() : "";
        filterReq.minPrice ? reqParams += "&totalPrice.greaterThanOrEqual=" + filterReq.minPrice : "";
        filterReq.maxPrice ? reqParams += "&totalPrice.lessThanOrEqual=" + filterReq.maxPrice : "";
        filterReq.table ? reqParams += "&tableId.equals=" + filterReq.table : "";
        filterReq.state ? reqParams += "&state.equals=" + filterReq.state : "";
        this.httpService.doRequest(HttpMethod.GET, `${this.getBasePath()}/filter${reqParams}`, '', cb);
    }
}
