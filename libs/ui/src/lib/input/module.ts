import { NgModule } from "@angular/core";
import { InputTextComponent } from "./components/input-text/input-text.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        InputTextComponent
    ],
    exports: [
        InputTextComponent
    ]
})
export class UiInputsModule { }

export * from './components/input-text/input-text.component';