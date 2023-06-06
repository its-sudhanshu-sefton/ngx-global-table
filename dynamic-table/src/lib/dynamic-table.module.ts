import { NgModule } from '@angular/core';
import { DynamicTableComponent } from './dynamic-table.component';
import { PaginatorComponent } from './feature-components/paginator/paginator.component';
import { MenuComponent } from './feature-components/menu/menu.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    DynamicTableComponent,
    PaginatorComponent,
    MenuComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [DynamicTableComponent]
})
export class DynamicTableModule { }
