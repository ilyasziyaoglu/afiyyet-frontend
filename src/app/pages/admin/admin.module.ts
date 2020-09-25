import {NgModule} from '@angular/core';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {AdminCampaignsComponent} from './admin-campaigns/admin-campaigns.component';
import {AdminMenuComponent} from './admin-menu/admin-menu.component';
import {AdminCommentsComponent} from './admin-comments/admin-comments.component';
import {AdminReservationsComponent} from './admin-reservations/admin-reservations.component';
import {ItemEditComponent} from './item-edit/item-edit.component';
import {DialogCommentComponent} from './dialogs/dialog-comment/dialog-comment.component';
import {DialogCategoryEditComponent} from './dialogs/dialog-category-edit/dialog-category-edit.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { AdminReportsComponent } from './admin-reports/admin-reports.component';


@NgModule({
    declarations: [
        AdminComponent,
        AdminCampaignsComponent,
        AdminMenuComponent,
        AdminCommentsComponent,
        AdminReservationsComponent,
        ItemEditComponent,
        DialogCommentComponent,
        DialogCategoryEditComponent,
        AdminReportsComponent
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
