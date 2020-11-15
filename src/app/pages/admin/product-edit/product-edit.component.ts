import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FileService} from '../../../base/services/file.service';
import Swal from 'sweetalert2';
import {AdminSessionService} from '../../../base/services/admin-session.service';
import {Location} from '@angular/common';
import {ProductService} from '../../../services/product.service';
import {CampaignService} from '../../../services/campaign.service';

@Component({
    selector: 'app-campaign-edit',
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {

    sessionData: any;
    product: any;
    formData: FormData;
    startTime;
    endTime;
    isCampaign = false;
    service: any;
    private returnUrl: string;

    constructor(
        private router: Router,
        private fileService: FileService,
        public location: Location,
        private productService: ProductService,
        private campaignService: CampaignService,
        private adminSessionService: AdminSessionService
    ) {
        this.isCampaign = router.url.includes('campaign');
        this.sessionData = this.adminSessionService.getCurrentProduct() || {};
        this.product = this.sessionData.product || {};
        if ( this.sessionData.product ) {
            this.product.startDate = new Date(this.product.startDate);
            this.product.expireDate = new Date(this.product.expireDate);
            this.startTime = this.product.startDate.getHours() + ':' + this.product.startDate.getMinutes();
            this.endTime = this.product.expireDate.getHours() + ':' + this.product.expireDate.getMinutes();
        }
    }

    ngOnInit(): void {
    }

    saveClick() {
        if (!this.isInputsOk()) {return; }

        const start = this.startTime.split(':');
        this.product.startDate.setHours(start[0], start[1]);

        const end = this.endTime.split(':');
        this.product.expireDate.setHours(end[0], end[1]);

        if (this.product.expireDate < new Date() && this.isCampaign) {
            Swal.fire('Uyarı', 'Önceki tarih için Kampanya oluşturulamaz', 'warning');
            return;
        }

        this.product.type = this.isCampaign ? 'CAMPAIGN' : 'PRODUCT';
        this.service = this.isCampaign ? this.campaignService : this.productService;
        this.returnUrl = this.isCampaign ? '/pages/admin/campaigns' : '/pages/admin/menu';

        if ( this.sessionData.isEdit ) {
            if ( this.formData ) {
                this.fileService.uploadFile(this.formData, res => {
                    if ( res.fileName ) {
                        this.product.imgUrl = res.fileName;
                        this.service.update(this.product, res2 => {
                            if ( res2 ) {
                                this.resetForm();
                                this.router.navigateByUrl(this.returnUrl).then();
                            }
                        });
                    } else {
                        Swal.fire('Uyarı', 'Resim yüklenirken hata oluştu', 'warning');
                    }
                });
            } else {
                this.service.update(this.product, res => {
                    if ( res ) {
                        this.resetForm();
                        this.router.navigateByUrl(this.returnUrl).then();
                    }
                });
            }
        } else {
            this.fileService.uploadFile(this.formData, res => {
                if ( res.fileName ) {
                    this.product.imgUrl = res.fileName;
                    this.service.insert(this.product, response => {
                        if ( response ) {
                            this.resetForm();
                            this.router.navigateByUrl(this.returnUrl);
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
            reader.onload = e => this.product.imgUrl = reader.result.toString();
            reader.readAsDataURL(file);

            this.formData = new FormData();
            this.formData.append('file0', file);
        }
    }

    isInputsOk() {
        if ( !this.product.name ) {
            Swal.fire('Uyarı', 'İsim boş bırakılamaz!', 'warning');
            return false;
        }

        if ( !this.product.price ) {
            Swal.fire('Uyarı', 'Fiyat boş bırakılamaz!', 'warning');
            return false;
        }

        if ( isNaN(this.product.price) ) {
            Swal.fire('Uyarı', 'Fiyat rakam olmak zorundadır!', 'warning');
            return false;
        }

        if ( (!this.formData || !this.formData.has('file0')) && !this.product.imgUrl ) {
            Swal.fire('Uyarı', 'Fotoğraf boş bırakılamaz!', 'warning');
            return false;
        }

        if ( !this.product.startDate && this.isCampaign ) {
            Swal.fire('Uyarı', 'Başlama tarihi boş bırakılamaz!', 'warning');
            return false;
        }

        if ( !this.startTime && this.isCampaign ) {
            Swal.fire('Uyarı', 'Başlama saati boş bırakılamaz!', 'warning');
            return false;
        }

        if ( !this.product.expireDate && this.isCampaign ) {
            Swal.fire('Uyarı', 'Bitiş tarihi boş bırakılamaz!', 'warning');
            return false;
        }

        if ( !this.endTime && this.isCampaign ) {
            Swal.fire('Uyarı', 'Bitiş saati boş bırakılamaz!', 'warning');
            return false;
        }

        return true;
    }

    back() {
        this.resetForm();
        this.location.back();
    }

    resetForm() {
        this.adminSessionService.setCurrentProduct(null, false);
        this.product = null;
        this.startTime = null;
        this.endTime = null;
    }
}
