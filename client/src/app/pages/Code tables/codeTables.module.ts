import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeTablesComponent } from './code-tables/code-tables.component';
import { CodeTablesRoutingModule } from './codeTables-routing.module';
import { primeNgModule } from 'src/app/core/share/primeNg.module';

@NgModule({
    declarations: [CodeTablesComponent],
    imports: [
        CommonModule,
        CodeTablesRoutingModule,
        primeNgModule,
    ]
})
export class CodeTablesModule { }
