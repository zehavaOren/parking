import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EntitlementDetailsModule } from "../../modules/entitlement_details/entitlement.module";
import { SearchComponent } from './search/search.component';
import { SearchRoutingModule } from './search-routing.module';
import { primeNgModule } from 'src/app/core/share/primeNg.module';


@NgModule({
    declarations: [SearchComponent],
    imports: [
        CommonModule,
        SearchRoutingModule,
        FormsModule,
        EntitlementDetailsModule,
        primeNgModule
    ]
})
export class SearchModule { }
