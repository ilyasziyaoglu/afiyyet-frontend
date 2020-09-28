import { Component, OnInit } from '@angular/core';
import {CampaignService} from '../../../services/campaign.service';
import {Campaign} from '../../../services/models/models';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {Router} from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-admin-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {

  campaignsArranged = false;

  constructor(public campaignService: CampaignService,
              private router: Router) {
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

  editCampaign(item: any) {
    this.router.navigateByUrl('/campaign-edit',
        {state: {status: 'update', data: {item}} });
  }

  addCampaign() {
    this.router.navigateByUrl('/campaign-edit',
        {state: {status: 'insert', data: {}}});
  }

  deleteItem(item: any, index) {
    Swal.fire({
      title: 'Dikkat!',
      text: 'Ürünü silmek istediğinize emin misiniz? Bu işlem geri alınamaz!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet, silinsin!',
      cancelButtonText: 'İptal',
    }).then((result) => {
      if (result.isConfirmed) {
        this.campaignService.deleteCampaign(item.id, res => {
          if ( res ) {
            this.campaignService.campaigns.splice(index, 1);
            Swal.fire('Silindi!', 'Ürün silindi!.', 'success');
          }
        });
      }
    });
  }

  convertDate(strDate) {
    return new Date(strDate).toLocaleString('en-GB').slice(0, -3);
  }

  arrangeCampaign(event: CdkDragDrop<Campaign>) {

  }

  campaignArrangeSave() {

  }
}
