import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FileService} from '../../../base/services/file.service';
import Swal from 'sweetalert2';
import {CampaignService} from '../../../services/campaign.service';
import {AdminSessionService} from '../../../base/services/admin-session.service';
import {Location} from '@angular/common';

@Component({
    selector: 'app-campaign-edit',
    templateUrl: './campaign-edit.component.html',
    styleUrls: ['./campaign-edit.component.scss'],
})
export class CampaignEditComponent implements OnInit {

    sessionData: any;
    campaign: any;
    formData: FormData;
    startTime;
    endTime;

    constructor(
        private router: Router,
        private fileService: FileService,
        public location: Location,
        private campaignService: CampaignService,
        private adminSessionService: AdminSessionService
    ) {
        this.sessionData = this.adminSessionService.getCurrentCampaign() || {};
        this.campaign = this.sessionData.campaign || {};
        if ( this.sessionData.campaign ) {
            this.campaign.startDate = new Date(this.campaign.startDate);
            this.campaign.expireDate = new Date(this.campaign.expireDate);
            this.startTime = this.campaign.startDate.getHours() +':'+ this.campaign.startDate.getMinutes();
            this.endTime = this.campaign.expireDate.getHours() +':'+ this.campaign.expireDate.getMinutes();
        }
    }

    ngOnInit(): void {
    }

    saveClick() {
        if (!this.isInputsOk()) {return;}

        let start = this.startTime.split(':');
        this.campaign.startDate.setHours(start[0], start[1]);

        let end = this.endTime.split(':');
        this.campaign.expireDate.setHours(end[0], end[1]);

        if (this.campaign.expireDate < new Date()) {
            Swal.fire('Uyarı', 'Önceki tarih için Kampanya oluşturulamaz', 'warning');
            return;
        }

        if ( this.sessionData.isEdit ) {
            if ( this.formData ) {
                this.fileService.uploadFile(this.formData, res => {
                    if ( res.fileName ) {
                        this.campaign.imgUrl = res.fileName;
                        this.campaignService.update(this.campaign, res2 => {
                            if ( res2 ) {
                                this.router.navigateByUrl('/pages/admin/campaigns').then();
                            }
                        });
                    } else {
                        Swal.fire('Uyarı', 'Resim yüklenirken hata oluştu', 'warning');
                    }
                });
            } else {
                this.campaignService.update(this.campaign, res => {
                    if ( res ) {
                        this.router.navigateByUrl('/pages/admin/campaigns').then();
                    }
                });
            }
        } else {
            this.fileService.uploadFile(this.formData, res => {
                if ( res.fileName ) {
                    this.campaign.imgUrl = res.fileName;
                    this.campaignService.insert(this.campaign, response => {
                        if ( response ) {
                            this.router.navigateByUrl('/pages/admin/campaigns');
                        }
                    });
                } else {
                    Swal.fire('Uyarı', 'Resim yüklenirken hata oluştu', 'warning');
                }
            });
        }
    }

    imageUpdateClick(event) {
        if ( event.target.files && event.target.files[0] ) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = e => this.campaign.imgUrl = reader.result.toString();
            reader.readAsDataURL(file);

            this.formData = new FormData();
            this.formData.append('file0', file);
        }
    }

    isInputsOk() {
        if ( !this.campaign.name ) {
            Swal.fire('Uyarı', 'Kampanya ismi boş bırakılamaz!', 'warning');
            return false;
        }

        if ( !this.campaign.price ) {
            Swal.fire('Uyarı', 'Kampanya fiyatı boş bırakılamaz!', 'warning');
            return false;
        }

        if ( isNaN(this.campaign.price) ) {
            Swal.fire('Uyarı', 'Kampanya fiyatı rakam olmak zorundadır!', 'warning');
            return false;
        }

        if ( (!this.formData || !this.formData.has('file0')) && !this.campaign.imgUrl ) {
            Swal.fire('Uyarı', 'Kampanya fotoğrafı boş bırakılamaz!', 'warning');
            return false;
        }

        if ( !this.campaign.startDate ) {
            Swal.fire('Uyarı', 'Kampanyanın başlama tarihi boş bırakılamaz!', 'warning');
            return false;
        }

        if ( !this.startTime ) {
            Swal.fire('Uyarı', 'Kampanyanın başlama saati boş bırakılamaz!', 'warning');
            return false;
        }

        if ( !this.campaign.expireDate ) {
            Swal.fire('Uyarı', 'Kampanyanın bitiş tarihi boş bırakılamaz!', 'warning');
            return false;
        }

        if ( !this.endTime ) {
            Swal.fire('Uyarı', 'Kampanyanın bitiş saati boş bırakılamaz!', 'warning');
            return false;
        }

        return true;
    }
}
