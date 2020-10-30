import {Injectable} from '@angular/core';
import {BaseService} from '../base/services/base-service';
import {HttpMethod, HttpService} from '../base/services/http.service';
import {Product} from './models/models';

@Injectable({
    providedIn: 'root',
})
export class CampaignService extends BaseService {

    basePath = 'product';
    activeCampaigns: Product[] = [];
    passiveCampaigns: Product[] = [];

    constructor(httpService: HttpService) {
        super(httpService);
    }

    getBasePath(): string {
        return this.basePath;
    }

    insert(campaign, cb?) {
        campaign.type = 'CAMPAIGN';
        this.post(campaign, cb);
    }

    delete(campaignId, cb?) {
        super.delete(campaignId, cb);
    }

    arrange(idOrderPairs: any, cb?) {
        this.getHttpService().doRequest(HttpMethod.POST, `${this.getBasePath()}/arrange-products`, idOrderPairs, cb);
    }

    update(campaign, cb?) {
        super.put(campaign, cb);
    }

    getAllByBrand(cb?) {
        this.getHttpService().doRequest(HttpMethod.GET, 'category/get-campaigns-by-brand', '', cb);
    }


}
