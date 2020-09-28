import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FileService} from '../../../base/services/file.service';
import Swal from "sweetalert2";
import {CampaignService} from '../../../services/campaign.service';

@Component({
  selector: 'app-campaign-edit',
  templateUrl: './campaign-edit.component.html',
  styleUrls: ['./campaign-edit.component.scss']
})
export class CampaignEditComponent implements OnInit {

  campaign: any = {};
  status;
  formData: FormData;

  constructor(private router: Router,
              private fileService: FileService,
              private campaignService: CampaignService) {

    this.status = this.router.getCurrentNavigation().extras.state.status;
    this.campaign = this.router.getCurrentNavigation().extras.state.data.item || {};
    this.campaign.startDate = this.dateToISOString(this.campaign.startDate)
    this.campaign.expireDate = this.dateToISOString(this.campaign.expireDate);
  }

  ngOnInit(): void {
  }

  saveClick() {
    if (!this.campaign.name) {
      Swal.fire('Uyarı', 'Kampanya ismi boş bırakılamaz!', 'warning');
      return;
    }

    if (!this.campaign.price) {
      Swal.fire('Uyarı', 'Kampanya fiyatı boş bırakılamaz!', 'warning');
      return;
    }

    if ((!this.formData || !this.formData.has('file0')) && !this.campaign.imgUrl) {
      console.log("formData", this.formData)
      Swal.fire('Uyarı', 'Kampanya fotoğrafı boş bırakılamaz!', 'warning');
      return;
    }

    this.campaign.startDate = new Date(this.campaign.startDate).toISOString();
    this.campaign.expireDate = new Date(this.campaign.expireDate).toISOString();

    if (this.status === 'update') {
      if (this.formData) {
        this.fileService.uploadFile(this.formData, res => {
          if (res.fileName) {
            this.campaign.imgUrl = res.fileName;
            this.campaignService.updateCampaign(this.campaign, res => {
              if (res) this.router.navigateByUrl('/admin-campaigns').then();
            });
          }
        });
      } else {
        this.campaignService.updateCampaign(this.campaign, res => {
          if (res) this.router.navigateByUrl('/admin-campaigns').then();
        });
      }
    } else if (this.status === 'insert') {
      this.fileService.uploadFile(this.formData, res => {
        if (res.fileName) {
          this.campaign.imgUrl = res.fileName;
          this.campaignService.insertCampaign(this.campaign, response => {
            if (response) { this.router.navigateByUrl('/admin-campaigns'); }
          });
        }
      });
    }
  }

  imageUpdateClick(image) {
    console.log("image", image.files[0]);
    this.formData = new FormData();
    this.formData.append('file0', image.files[0]);
  }

  dateToISOString(str) {
    let date = new Date(str);
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
        .toISOString().slice(0, -1);
  }
}
