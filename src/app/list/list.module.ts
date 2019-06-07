import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { CardModule } from '../card/card.module';
import { ListComponent } from './list.component';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, CardModule, SharedModule, FormsModule, ReactiveFormsModule],
  declarations: [ListComponent],
  providers: [],
  exports: [ListComponent]
})
export class ListModule { }