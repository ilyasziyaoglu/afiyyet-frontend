import { Injectable } from '@angular/core';
import {BaseService} from '../base/services/base-service';
import {HttpService} from '../base/services/http.service';
import {Campaign} from './models/models';

@Injectable({
  providedIn: 'root'
})
export class CampaignService extends BaseService{

  basePath = 'campaign';
  campaigns: Campaign[];

  constructor(httpService: HttpService) {
    super(httpService);
  }

  getBasePath(): string {return this.basePath}

  insertCampaign(campaign, cb?) {
    this.post(campaign, cb);
  }

  deleteCampaign() {

  }

  arrangeCampaign() {

  }

  updateCampaign() {

  }

  getAllCampaigns(cb?) {
    this.getAll(cb);
  }

  getCampaignById() {

  }


}
