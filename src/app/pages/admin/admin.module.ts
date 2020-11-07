import {NgModule} from '@angular/core';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CampaignsComponent} from './campaigns/campaigns.component';
import {MenuComponent} from './menu/menu.component';
import {CommentsComponent} from './comments/comments.component';
import {ReservationsComponent} from './reservations/reservations.component';
import {ItemEditComponent} from './item-edit/item-edit.component';
import {DialogCommentComponent} from '../../menu/dialog-comment/dialog-comment.component';
import {CategoryEditComponent} from './category-edit/category-edit.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { ReportsComponent } from './reports/reports.component';
import {MatBadgeModule} from '@angular/material/badge';
import {BulkPriceUpdateComponent} from './bulk-price-update/bulk-price-update.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ComponentsModule} from '../../base/components/components.module';


@NgModule({
    declarations: [
        AdminComponent,
        CampaignsComponent,
        MenuComponent,
        CommentsComponent,
        ReservationsComponent,
        ItemEditComponent,
        DialogCommentComponent,
        CategoryEditComponent,
        BulkPriceUpdateComponent,
        ReportsComponent
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
        ComponentsModule,
    ],
})
export class AdminModule {
}
