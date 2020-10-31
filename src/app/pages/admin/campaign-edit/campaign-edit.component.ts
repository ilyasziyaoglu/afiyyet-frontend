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
            this.campaign.startDate = this.dateToISOString(this.campaign.startDate);
            this.campaign.expireDate = this.dateToISOString(this.campaign.expireDate);
        }
    }

    ngOnInit(): void {
    }

    saveClick() {
        if ( !this.campaign.name ) {
            Swal.fire('Uyarı', 'Kampanya ismi boş bırakılamaz!', 'warning');
            return;
        }

        if ( !this.campaign.price ) {
            Swal.fire('Uyarı', 'Kampanya fiyatı boş bırakılamaz!', 'warning');
            return;
        }

        if ( isNaN(this.campaign.price) ) {
            Swal.fire('Uyarı', 'Kampanya fiyatı rakam olmak zorundadır!', 'warning');
            return;
        }

        if ( (!this.formData || !this.formData.has('file0')) && !this.campaign.imgUrl ) {
            Swal.fire('Uyarı', 'Kampanya fotoğrafı boş bırakılamaz!', 'warning');
            return;
        }

        if ( !this.campaign.startDate ) {
            Swal.fire('Uyarı', 'Kampanyanın başlama tarihi boş bırakılamaz!', 'warning');
            return;
        }

        if ( !this.campaign.expireDate ) {
            Swal.fire('Uyarı', 'Kampanyanın bitiş tarihi boş bırakılamaz!', 'warning');
            return;
        }

        this.campaign.startDate = new Date(this.campaign.startDate).toISOString();
        this.campaign.expireDate = new Date(this.campaign.expireDate).toISOString();

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

    dateToISOString(str) {
        const date = new Date(str);
        return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
            .toISOString().slice(0, - 1);
    }
}
