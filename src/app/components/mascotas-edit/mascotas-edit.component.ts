import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MascotasService } from 'src/app/services/mascotas.service';
import { MascotasFormComponent } from '../mascotas-form/mascotas-form.component';
import { Mascota } from 'src/interfaces/mascota';

@Component({
  selector: 'app-mascotas-edit',
  templateUrl: './mascotas-edit.component.html',
  styleUrls: ['./mascotas-edit.component.scss'],
})
export class MascotasEditComponent implements OnInit {
  mascotaForm!: FormGroup;
  petToUpdate: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public mascota: any,
    private fb: FormBuilder,
    private mascotasService: MascotasService,
    public dialogRef: MatDialogRef<MascotasFormComponent>
  ) {
    this.petToUpdate = {...this.mascota};
  }

  ngOnInit(): void {
    this.mascotaForm = this.fb.group({
      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      edad: [0, Validators.min(0)],
    });
  }

  guardarMascota(event?: Event) {
    event?.preventDefault();
    const mascota = this.mascotaForm.value;
    let data: Mascota = {
      id: this.petToUpdate.id,
      nombre: mascota.nombre,
      raza: mascota.raza,
      edad: parseInt(mascota.edad),
    };
    console.log("🚀 ~ file: mascotas-edit.component.ts:44 ~ MascotasEditComponent ~ guardarMascota ~ data:", data)
    this.mascotasService.editarMascota(data);
    this.dialogRef.close(mascota);
  }
}
