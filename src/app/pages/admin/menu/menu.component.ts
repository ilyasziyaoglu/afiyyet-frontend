import {Component, OnInit} from '@angular/core';
import {MenuService} from '../../../services/menu.service';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {Category, Product} from '../../../services/models/models';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {AdminSessionService} from '../../../base/services/admin-session.service';
import {CategoryService} from '../../../services/category.service';
import {ProductService} from '../../../services/product.service';
import {DialogCategoryEditComponent} from '../dialog-category-edit/dialog-category-edit.component';
import Swal from 'sweetalert2';
import {UserService} from '../../../base/services/user.service';

@Component({
    selector: 'app-admin',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})

export class MenuComponent implements OnInit {

    productsArranged = false;
    categoriesArranged = false;
    categoryCount = 0;
    totalProductCount = 253;
    categoryProductCount = 0;

    constructor(
        private menuService: MenuService, private storageService: AdminSessionService,
        private router: Router, private dialog: MatDialog,
        public categoryService: CategoryService, private productService: ProductService,
        private adminSessionService: AdminSessionService, public userService: UserService
    ) {
        categoryService.getCategoriesByBrand(data => {
            this.categoryService.categories = data;
            this.categoryCount = data.length;
            this.categoryService.currentCategory = this.categoryService.currentCategory || this.categoryService.categories[0];
            if ( this.categoryService.currentCategory ) {
                this.productService.getProductsByCategory(this.categoryService.currentCategory.id, results => {
                    this.categoryService.currentCategory.products = results;
                    this.categoryProductCount = results.length;
                });
            }
        });
    }

    ngOnInit(): void {
    }

    categoryArrangeSave() {
        const pairs = {};
        this.categoryService.categories.forEach(category => {
            pairs[category.id] = category.order;
        });
        this.categoryService.arrangeCateogories(pairs, res => {
            if ( res ) {
                this.categoriesArranged = false;
            }
        });
    }

    productArrangeSave() {
        const pairs = {};
        this.categoryService.currentCategory.products.forEach(item => {
            pairs[item.id] = item.order;
        });
        this.productService.arrangeProducts(pairs, res => {
            if ( res ) {
                this.productsArranged = false;
            }
        });
    }

    arrangeCategory(event: CdkDragDrop<Category>) {
        this.categoriesArranged = true;
        this.categoryService.categories = this.moveItemOrderInArray(
            this.categoryService.categories, event.previousIndex, event.currentIndex);
    }

    arrangeProduct(event: CdkDragDrop<Product>) {
        this.productsArranged = true;
        this.categoryService.currentCategory.products = this.moveItemOrderInArray(
            this.categoryService.currentCategory.products, event.previousIndex, event.currentIndex);
    }

    categoryClick(category) {
        this.categoryService.currentCategory = category;
        this.productService.getProductsByCategory(category.id, result => {
            category.products = result;
            this.categoryProductCount = result.length;
        });
        document.getElementById("category-name").scrollIntoView();
    }

    addItem() {
        this.adminSessionService.setCurrentProduct(null, false);
        this.router.navigateByUrl('/pages/admin/item-edit');
    }

    deleteItem(item, index) {
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
                this.productService.deleteProduct(item.id, res => {
                    if ( res ) {
                        this.categoryService.currentCategory.products.splice(index, 1);
                        Swal.fire('Silindi!', 'Ürün silindi!.', 'success');
                    }
                });
            }
        });
    }

    editItem(item) {
        this.adminSessionService.setCurrentProduct(item, true);
        this.router.navigateByUrl('/pages/admin/item-edit');
    }

    addCategoryClick() {
        const dialogRef = this.dialog.open(DialogCategoryEditComponent, {panelClass: 'category-edit-dialog'});

        dialogRef.afterClosed().subscribe(res => {
            res.category.status = 'ACTIVE';
            this.categoryService.insertCategory(res.category, result => {
                this.categoryService.categories.push(result);
            });
        });
    }


    editCategoryClick(category, index) {
        const dialogRef = this.dialog.open(DialogCategoryEditComponent,
            {panelClass: 'category-edit-dialog', data: {...category}});

        dialogRef.afterClosed().subscribe(res => {
            if ( res.category ) {
                this.categoryService.updateCategory(res.category, result => {
                    if ( result ) {
                        this.categoryService.categories[index] = res.category;
                    }
                });
            }
        });
    }

    onCategoryDelete(category, index) {
        if ( confirm('Bu kategoriyi silmek istediğinize emin misiniz?') ) {
            this.categoryService.deleteCategory(category.id, result => {
                if ( result ) {
                    this.categoryService.categories.splice(index, 1);
                }
            });
        }
    }

    moveItemOrderInArray(arr, prevIndex, nextIndex) {
        arr.splice(nextIndex, 0, arr.splice(prevIndex, 1)[0]);
        arr = arr.map((item, i) => ({...item, order: i}));
        return arr;
    }

    getTotalProducts(categories) {
        let count = 0;
        categories.forEach(cat => count += cat.products.length);
        return count;
    }


}
