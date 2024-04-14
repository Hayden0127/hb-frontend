import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import {NumberFormatterPipe} from "./numberFormatter.pipe";

@NgModule({
    declarations:[NumberFormatterPipe],
    imports:[CommonModule],
    exports:[NumberFormatterPipe] 
})

export class NumberFormatter{}