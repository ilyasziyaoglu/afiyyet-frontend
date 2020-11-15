import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminProductCardComponent} from './admin-product-card/admin-product-card.component';
import {AtomsModule} from '../atoms/atoms.module';
import {MatIconModule} from '@angular/material/icon';
import {DragDropModule} from '@angular/cdk/drag-drop';


@NgModule({
    declarations: [AdminProductCardComponent],
    imports: [
        CommonModule,
        AtomsModule,
        MatIconModule,
        DragDropModule,
    ],
    exports: [
        AdminProductCardComponent,
    ],
})
export class ComponentsModule { }
