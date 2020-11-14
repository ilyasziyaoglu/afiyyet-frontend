import {Component, OnInit} from '@angular/core';
import {CampaignService} from '../../../services/campaign.service';
import {Product} from '../../../services/models/models';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {AdminSessionService} from '../../../base/services/admin-session.service';
import {UserService} from '../../../base/services/user.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {

  campaignsArranged = false;
  today = new Date();

  constructor(public campaignService: CampaignService,
              private router: Router,
              private adminSessionService: AdminSessionService,
              public userService: UserService) {
    campaignService.getAllByBrand(res => {
      // push isleminde duplicate gorunmemesi icin boş array'e atandi.
      campaignService.activeCampaigns = [];
      campaignService.passiveCampaigns = [];
      res.forEach(camp => {
        if (new Date(camp.expireDate) < this.today){
          campaignService.passiveCampaigns.push(camp);
        } else {
          campaignService.activeCampaigns.push(camp);
        }
      });
    });
  }

  ngOnInit(): void {
  }
  insertCampaign() {
    this.adminSessionService.setCurrentProduct(null, false);
    this.router.navigateByUrl('/pages/admin/campaign-edit');
  }

  arrangeCampaign(event: CdkDragDrop<Product>) {
    this.campaignsArranged = true;
    this.campaignService.activeCampaigns = this.moveItemOrderInArray(
        this.campaignService.activeCampaigns, event.previousIndex, event.currentIndex);
  }

  campaignArrangeSave() {
    const pairs = {};
    this.campaignService.activeCampaigns.forEach(campaign => {
      pairs[campaign.id] = campaign.order;
    });
    this.campaignService.arrange(pairs, res => {
      if (res) { this.campaignsArranged = false; }
    });
  }

  moveItemOrderInArray(arr, prevIndex, nextIndex) {
    arr.splice(nextIndex, 0, arr.splice(prevIndex, 1)[0]);
    arr = arr.map((item, i) => ({...item, order: i}));
    return arr;
  }
}
