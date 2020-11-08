import {Component, Input} from '@angular/core';
import {UserService} from '../../services/user.service';
import {MenuService} from '../../../services/menu.service';
import {ProductService} from '../../../services/product.service';
import {Router} from '@angular/router';
import {AdminSessionService} from '../../services/admin-session.service';
import Swal from 'sweetalert2';
import {CategoryService} from '../../../services/category.service';
import {Product} from '../../../services/models/models';
import {DateUtilsService} from '../../utils/date-utils.service';

@Component({
    selector: 'app-admin-product-card',
    templateUrl: './admin-product-card.component.html',
    styleUrls: ['./admin-product-card.component.scss'],
})
export class AdminProductCardComponent {
    @Input() product: Product;
    @Input() index: number;

    constructor(
        private router: Router,
        public userService: UserService,
        private menuService: MenuService,
        private productService: ProductService,
        public categoryService: CategoryService,
        public dateUtilsService: DateUtilsService,
        private adminSessionService: AdminSessionService,
    ) {
    }

    editItem() {
        this.adminSessionService.setCurrentProduct(this.product, true);
        if (this.product.type === 'CAMPAIGN') {
            this.router.navigateByUrl('/pages/admin/campaign-edit');
        } else {
            this.router.navigateByUrl('/pages/admin/item-edit');
        }
    }

    deleteItem() {
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
            if ( result.isConfirmed ) {
                this.productService.delete(this.product.id, res => {
                    if ( res ) {
                        this.categoryService.currentCategory.products.splice(this.index, 1);
                        Swal.fire('Silindi!', 'Ürün silindi!.', 'success');
                    }
                });
            }
        });
    }
}
