import { NgModule } from '@angular/core';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  imports: [
    MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatIconModule, MatCardModule, MatDividerModule, MatSidenavModule,
    MatProgressSpinnerModule, MatRadioModule, MatProgressBarModule, MatCheckboxModule, MatDatepickerModule, MatMomentDateModule,
    MatTooltipModule, MatDialogModule, MatExpansionModule, MatAutocompleteModule, MatBadgeModule, MatTableModule, MatMenuModule,
    MatSlideToggleModule, MatButtonToggleModule
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ],
  exports: [
    MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatIconModule, MatCardModule, MatDividerModule, MatSidenavModule,
    MatProgressSpinnerModule, MatRadioModule, MatProgressBarModule, MatCheckboxModule, MatDatepickerModule,
    MatTooltipModule, MatDialogModule, MatExpansionModule, MatAutocompleteModule, MatBadgeModule, MatTableModule, MatMenuModule,
    MatSlideToggleModule, MatButtonToggleModule
  ]
})
export class MaterialModule { }
