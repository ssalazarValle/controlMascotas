import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { MascotasService } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-mascotas-form',
  templateUrl: './mascotas-form.component.html',
  styleUrls: ['./mascotas-form.component.scss'],
})
export class MascotasFormComponent implements OnInit {
  public mascotaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private mascotasService: MascotasService,
    public dialogRef: MatDialogRef<MascotasFormComponent>
  ) {}

  ngOnInit(): void {
    this.mascotaForm = this.fb.group({
      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      edad: [0, Validators.min(0)],
    });
  }

  onSubmit(): void {}

  guardarMascota(event?: Event) {
    event?.preventDefault();
    const mascota = this.mascotaForm.value;
    if (this.mascotaForm.valid) {
      this.mascotasService.guardarMascota(mascota);
      this.mascotaForm.reset();
    }

    this.dialogRef.close(mascota);
  }
}
