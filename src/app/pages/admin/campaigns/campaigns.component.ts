import { Component, OnInit } from '@angular/core';
import {CampaignService} from '../../../services/campaign.service';
import {Campaign} from '../../../services/models/models';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-admin-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {

  campaignsArranged = false;

  constructor(private campaignService: CampaignService) {
    // campaignService.insertCampaign(
    //     {
    //       description: "Bir Alana Sifir hediye",
    //       expireDate: "2020-09-30T19:20:49.454Z",
    //       imgUrl: "https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg",
    //       likes: 5,
    //       name: "string",
    //       order: 1,
    //       price: 45,
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

  convertDate(strDate) {
    return new Date(strDate).toLocaleString('en-GB').slice(0, -3);
  }

  arrangeProduct(event: CdkDragDrop<Campaign>) {

  }

  campaignArrangeSave() {

  }

  addCampaign() {

  }
}
