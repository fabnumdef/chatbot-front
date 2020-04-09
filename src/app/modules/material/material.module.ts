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

@NgModule({
  imports: [
    MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatIconModule, MatCardModule, MatDividerModule, MatSidenavModule,
    MatProgressSpinnerModule, MatRadioModule, MatProgressBarModule
  ],
  exports: [
    MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatIconModule, MatCardModule, MatDividerModule, MatSidenavModule,
    MatProgressSpinnerModule, MatRadioModule, MatProgressBarModule
  ]
})
export class MaterialModule { }
