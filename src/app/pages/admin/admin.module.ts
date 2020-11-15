import {NgModule} from '@angular/core';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CampaignsComponent} from './campaigns/campaigns.component';
import {MenuComponent} from './menu/menu.component';
import {CommentsComponent} from './comments/comments.component';
import {ReservationsComponent} from './reservations/reservations.component';
import {DialogCommentComponent} from '../../menu/dialog-comment/dialog-comment.component';
import {CategoryEditComponent} from './category-edit/category-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { ReportsComponent } from './reports/reports.component';
import {MatBadgeModule} from '@angular/material/badge';
import {BulkPriceUpdateComponent} from './bulk-price-update/bulk-price-update.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { TablesComponent } from './tables/tables.component';
import { EditTableComponent } from './edit-table/edit-table.component';
import {MatSelectModule} from '@angular/material/select';
import { TableDetailComponent } from './table-detail/table-detail.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';
import {ComponentsModule} from '../../base/components/components.module';


@NgModule({
    declarations: [
        AdminComponent,
        CampaignsComponent,
        MenuComponent,
        CommentsComponent,
        ReservationsComponent,
        DialogCommentComponent,
        CategoryEditComponent,
        BulkPriceUpdateComponent,
        ReportsComponent,
        TablesComponent,
        EditTableComponent,
        TableDetailComponent
    ],
    imports: [
        DragDropModule,
        AdminRoutingModule,
        MatDialogModule,
        FormsModule,
        CommonModule,
        MatIconModule,
        MatBadgeModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatTableModule,
        ComponentsModule,
    ],
})
export class AdminModule {
}
