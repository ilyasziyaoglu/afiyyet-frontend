import {Component, OnInit} from '@angular/core';
import {MenuService} from '../services/menu.service';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {Category, Item} from '../model/models';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {StorageService} from '../common/services/storage.service';
import {CategoryService} from '../services/category.service';
import {ProductService} from '../services/product.service';
import {DialogCategoryEditComponent} from '../dialogs/dialog-category-edit/dialog-category-edit.component';
import {environment} from 'src/environments/environment';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
})

export class AdminComponent implements OnInit {

    environment = environment;
    currentMenuIndex = 0;
    productsArranged = false;
    categoriesArranged = false;

    constructor(
        private menuService: MenuService, private storageService: StorageService,
        private router: Router, private dialog: MatDialog,
        public categoryService: CategoryService, private productService: ProductService,
    ) {
        categoryService.getCategoriesByBrand(data => {
            this.categoryService.categories = data;
            this.categoryService.currentCategory = this.categoryService.categories[0];
            if ( this.categoryService.currentCategory ) {
                this.productService.getProductsByCategory(this.categoryService.currentCategory.id, results => {
                    this.categoryService.currentCategory.items = results;
                });
            }
        });
    }

    ngOnInit(): void {
    }

    menuClick(index) {
        this.currentMenuIndex = index;
    }

    categoryArrangeSave() {
        const pairs = [];
        this.categoryService.categories.forEach(category => {
            pairs.push({id: category.id, order: category.order});
        });
        this.categoryService.arrangeCateogories(pairs, res => {
            //IF Koşulunun düzenlenmesi lazım.
            if (res) this.categoriesArranged = false;
        });
    }

    productArrangeSave() {
        const pairs = [];
        this.categoryService.currentCategory.items.forEach(item => {
            pairs.push({id: item.id, order: item.order})
        });
        this.productService.arrangeProducts(pairs, res => {
            //IF Koşulunun düzenlenmesi lazım.
            if (res) this.productsArranged = false;
        });
    }

    arrangeCategory(event: CdkDragDrop<Category>) {
        this.categoriesArranged = true;
        this.categoryService.categories = this.moveItemOrderInArray(
            this.categoryService.categories, event.previousIndex, event.currentIndex);
    }

    arrangeProduct(event: CdkDragDrop<Item>) {
        this.productsArranged = true;
        this.categoryService.currentCategory.items = this.moveItemOrderInArray(
            this.categoryService.currentCategory.items, event.previousIndex, event.currentIndex);
    }

    categoryClick(category) {
        this.categoryService.currentCategory = category;
        this.productService.getProductsByCategory(category.id, result => {
            category.items = result;
        });
    }

    addItem() {
        this.router.navigateByUrl('item-edit',
            {state: {status: 'insert', data: {}}}).then();
    }

    deleteItem(item, index) {
        if ( confirm('Bu ürünü silmek istediğinize emin misiniz?') ) {
            this.productService.deleteProduct(item.id, res => {
                if ( res ) {
                    this.categoryService.currentCategory.items.splice(index, 1);
                }
            });
        }
    }

    editItem(item) {
        this.router.navigateByUrl('item-edit',
            {state: {status: 'update', data: {item}}}).then();
    }

    addCategoryClick() {
        const dialogRef = this.dialog.open(DialogCategoryEditComponent, {width: '60%'});

        dialogRef.afterClosed().subscribe(res => {
            res.category.status = 'ACTIVE';
            this.categoryService.insertCategory(res.category, result => {
                this.categoryService.categories.push(result);
            });
        });
    }


    editCategoryClick(category, index) {
        const dialogRef = this.dialog.open(DialogCategoryEditComponent, {width: '60%', data: {...category}});

        dialogRef.afterClosed().subscribe(res => {
            this.categoryService.updateCategory(res.category, result => {
                //Buradaki kod basarili kosulunda calismali
                this.categoryService.categories[index] = res.category;
            });
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

    campaignSelected() {

    }

    moveItemOrderInArray(arr, prevIndex, nextIndex) {
        arr.splice(nextIndex, 0, arr.splice(prevIndex, 1)[0]);
        arr = arr.map((item, i) => ({...item, order: i}));
        return arr;
    }
}
