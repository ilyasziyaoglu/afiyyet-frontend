import { Component, OnInit } from '@angular/core';
import {CampaignService} from '../../../services/campaign.service';

@Component({
  selector: 'app-admin-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {

  constructor(private campaignService: CampaignService) {
    // campaignService.insertCampaign(
    //     {
    //       description: "string",
    //       expireDate: "2020-09-27T19:20:49.454Z",
    //       id: 0,
    //       imgUrl: "string",
    //       likes: 0,
    //       name: "string",
    //       order: 0,
    //       price: 0,
    //       startDate: "2020-09-27T19:20:49.454Z",
    //       status: "ACTIVE"
    //     },
    //     res => {
    //       console.log("deneme", res);
    //     }
    // )
    campaignService.getAllCampaigns(res => {
      campaignService.campaigns = res;
    });
  }

  ngOnInit(): void {
  }

  editItem(item: any) {

  }

  deleteItem(item: any, i: number) {

  }
}
