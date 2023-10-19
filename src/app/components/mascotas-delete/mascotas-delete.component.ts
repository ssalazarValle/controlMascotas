import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MascotasService } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-mascotas-delete',
  templateUrl: './mascotas-delete.component.html',
  styleUrls: ['./mascotas-delete.component.scss'],
})
export class MascotasDeleteComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public mascota: any,
    private mascotasService: MascotasService,
    public dialogRef: MatDialogRef<MascotasDeleteComponent>
  ) {}

  deletePet() {
    this.dialogRef.close(this.mascota);
  }
}
