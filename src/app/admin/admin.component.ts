import {Component, OnInit} from '@angular/core';
import {MenuService} from '../services/menu.service';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {Category} from '../model/models';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {StorageService} from '../common/services/storage.service';
import {CategoryService} from '../services/category.service';
import {ProductService} from '../services/product.service';
import {DialogCategoryEditComponent} from '../dialog-category-edit/dialog-category-edit.component';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
})

export class AdminComponent implements OnInit {

    openIndex = 0;
    itemSave = false;
    categorySave = false;

    categories: any[] = [];

    constructor(
        private menuService: MenuService, private storageService: StorageService,
        private router: Router,
        private dialog: MatDialog,
        public categoryService: CategoryService,
        private productService: ProductService,
    ) {
        categoryService.getCategoriesByBrand(data => {
            this.categories = data;
            this.categoryService.currentCategory = this.categories[0];
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
        const dialogRef = this.dialog.open(DialogCategoryEditComponent);

        dialogRef.afterClosed().subscribe(res => {
            res.category.imgUrl = '';
            res.category.status = 'ACTIVE';
            this.categoryService.insertCategory(res.category, result => {
                this.categories.push(result);
            });
        });
    }


    editCategoryClick(category) {
        const dialogRef = this.dialog.open(DialogCategoryEditComponent, {data: {...category}});

        dialogRef.afterClosed().subscribe(res => {
            this.categoryService.updateCategory(res.category, result => {

            });
        });
    }

    onCategoryDelete(category, index) {
        if ( confirm('Bu kategoriyi silmek istediğinize emin misiniz?') ) {
            this.categoryService.deleteCategory(category.id, result => {
                if ( result ) {
                    this.categories.splice(index, 1);
                }
            });
        }
    }
}
