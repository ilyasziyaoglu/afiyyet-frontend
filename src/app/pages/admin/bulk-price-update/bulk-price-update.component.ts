import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {ProductService} from '../../../services/product.service';

@Component({
    selector: 'app-dialog-category-edit',
    templateUrl: './bulk-price-update.component.html',
    styleUrls: ['./bulk-price-update.component.scss'],
})
export class BulkPriceUpdateComponent implements OnInit {

    isIncrease = true;
    bulkPriceUpdateRequest = {
        percent: false,
        amount: 0,
    };

    constructor(
        private dialog: MatDialogRef<BulkPriceUpdateComponent>,
        private productService: ProductService,
    ) {
    }

    ngOnInit(): void {
    }

    saveClick() {
        if ( !this.bulkPriceUpdateRequest.amount ) {
            Swal.fire('Uyarı', 'Güncelleme miktarı veya oranı boş bırakılamaz!', 'warning');
            return;
        }

        if ( !this.isIncrease ) {
            this.bulkPriceUpdateRequest.amount *= - 1;
        }

        this.productService.bulkPriceUpdate(this.bulkPriceUpdateRequest, res => {
            if ( res ) {
                Swal.fire('Sonuç', 'Fiyatlar başarı ile güncellenmiştir', 'success').then(() => {
                    location.reload();
                });
            } else {
                Swal.fire('Uyarı', 'Fiyatlar güncellenirken bir hata oluştu', 'warning');
            }
            this.dialog.close();
        });
    }

    cancelClick() {
        this.dialog.close();
    }
}
