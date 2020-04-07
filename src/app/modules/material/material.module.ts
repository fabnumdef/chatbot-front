import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  imports: [
    MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatIconModule, MatCardModule, MatDividerModule
  ],
  exports: [
    MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatIconModule, MatCardModule, MatDividerModule
  ]
})
export class MaterialModule { }
