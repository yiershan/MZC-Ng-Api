import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {BlogApiService} from "./provider";

@NgModule({
    imports: [
        CommonModule
    ],
    providers:    [ BlogApiService ],
})
export class MzcNgApiModule { }