import {Injectable} from '@angular/core';
import {BaseService} from '../base/services/base-service';
import {HttpMethod, HttpService} from '../base/services/http.service';
import {Campaign} from './models/models';

@Injectable({
    providedIn: 'root',
})
export class CampaignService extends BaseService {

    basePath = 'category';
    activeCampaigns: Campaign[] = [];
    passiveCampaigns: Campaign[] = [];

    constructor(httpService: HttpService) {
        super(httpService);
    }

    getBasePath(): string {
        return this.basePath;
    }

    insertCampaign(campaign, cb?) {
        campaign.type = "CAMPAIGN";
        this.getHttpService().doRequest(HttpMethod.POST, 'product', campaign, cb);
    }

    deleteCampaign(campaignId, cb?) {
        this.delete(campaignId, cb);
    }

    arrangeCampaigns(idOrderPairs: any, cb?) {
        this.getHttpService().doRequest(HttpMethod.POST, `${this.getBasePath()}/arrange-campaigns`, idOrderPairs, cb);
    }

    updateCampaign(campaign, cb?) {
        campaign.type = "CAMPAIGN";
        this.getHttpService().doRequest(HttpMethod.PUT, 'product', campaign, cb);
    }

    getAllCampaigns(cb?) {
        this.getHttpService().doRequest(HttpMethod.GET, `${this.getBasePath()}/get-campaigns-by-brand`, '', cb);
    }


}
