import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  imports: [
    MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatIconModule, MatCardModule, MatDividerModule, MatSidenavModule,
    MatProgressSpinnerModule, MatRadioModule, MatProgressBarModule, MatCheckboxModule, MatDatepickerModule, MatMomentDateModule,
    MatTooltipModule, MatDialogModule, MatExpansionModule, MatAutocompleteModule, MatBadgeModule, MatTableModule, MatMenuModule,
    MatSlideToggleModule, MatButtonToggleModule
  ],
  exports: [
    MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatIconModule, MatCardModule, MatDividerModule, MatSidenavModule,
    MatProgressSpinnerModule, MatRadioModule, MatProgressBarModule, MatCheckboxModule, MatDatepickerModule,
    MatTooltipModule, MatDialogModule, MatExpansionModule, MatAutocompleteModule, MatBadgeModule, MatTableModule, MatMenuModule,
    MatSlideToggleModule, MatButtonToggleModule
  ]
})
export class MaterialModule { }
