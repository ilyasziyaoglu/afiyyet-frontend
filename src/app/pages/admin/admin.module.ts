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
import {DialogCategoryEditComponent} from './dialog-category-edit/dialog-category-edit.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { ReportsComponent } from './reports/reports.component';


@NgModule({
    declarations: [
        AdminComponent,
        CampaignsComponent,
        MenuComponent,
        CommentsComponent,
        ReservationsComponent,
        ItemEditComponent,
        DialogCommentComponent,
        DialogCategoryEditComponent,
        ReportsComponent
    ],
    imports: [
        DragDropModule,
        AdminRoutingModule,
        MatDialogModule,
        FormsModule,
        CommonModule,
        MatIconModule,
    ],
})
export class AdminModule {
}
