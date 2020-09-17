import {Component, OnInit} from '@angular/core';
import {MenuService} from '../services/menu.service';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {Category} from '../model/models';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DialogCategoryNameComponent} from '../dialog-category-name/dialog-category-name.component';
import {StorageService} from '../common/services/storage.service';
import {CategoryService} from '../services/category.service';
import {ProductService} from '../services/product.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
})

export class AdminComponent implements OnInit {

    openIndex = 0;
    selectedCategoryIndex = 0;
    itemSave = false;
    categorySave = false;

    categories: any[];

    constructor(
        private menuService: MenuService, private storageService: StorageService,
        private router: Router,
        private dialog: MatDialog,
        private categoryService: CategoryService,
        private productService: ProductService
    ) {
        categoryService.getAll(data => {
            this.categories = data;
        });
    }

    ngOnInit(): void {
    }

    menuClick(index) {
        this.openIndex = index;
    }

    categoryArrangeSave() {
        const pairs = [];
        this.categories.forEach(category => {
            pairs.push({id: category.id, order: category.order});
        });
        this.categoryService.arrangeCateogories(pairs);
    }

    dropCategory(event: CdkDragDrop<Category>) {
        this.categorySave = true;
        this.categories = this.moveItemOrderInArray(this.categories, event.previousIndex, event.currentIndex);
    }

    moveItemOrderInArray(arr, prevIndex, nextIndex) {
        arr.splice(nextIndex, 0, arr.splice(prevIndex, 1)[0]);
        arr = arr.map((item, i) => ({...item, order: i}));
        return arr;
    }

    categoryClick(i: number) {
        this.selectedCategoryIndex = i;
    }

    addItem(categoryId: number) {
        this.router.navigateByUrl('item-edit',
            {state: {status: 'insert', data: {categoryId, itemId: null, item: null}}}).then();
    }

    editCategoryName(category) {
        const dialogRef = this.dialog.open(DialogCategoryNameComponent,
            {data: {categoryName: category.name}});

        dialogRef.afterClosed().subscribe(res => {
            if ( res.text ) {
                category.name = res.text;
                this.categoryService.updateCategory(category);
            }
        });
    }

    deleteItem(itemId) {
        if ( confirm('Bu Ürünü Silmek İstediğinize Emin misiniz?') ) {
            this.productService.deleteProduct(itemId);
        }
    }

    editItem(item) {
        this.router.navigateByUrl('item-edit',
            {state: {status: 'update', data: {categoryId: null, itemId: item.id, item}}}).then();
    }


}
