import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import {DecimalTimeFormatterPipe} from "./decimalTimeFormatter.pipe";

@NgModule({
    declarations:[DecimalTimeFormatterPipe],
    imports:[CommonModule],
    exports:[DecimalTimeFormatterPipe] 
})

export class DecimalTimeFormatter{}