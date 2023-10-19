import { Injectable } from '@angular/core';
import { Mascota } from 'src/interfaces/mascota';

@Injectable({
  providedIn: 'root',
})
export class MascotasService {
  private pets: Mascota[] = [];

  constructor() {
    this.loadPets();
  }

  private loadPets() {
    const petsData = localStorage.getItem('mascotas');
    if (petsData) {
      this.pets = JSON.parse(petsData);
    }
  }

  getMascotas(): Mascota[] {
    return this.pets;
  }

  guardarMascota(pet: Mascota) {
    pet.id = this.getNextId();
    this.pets.push(pet);
    this.savePets();
  }

  getPet(id: number): Mascota | undefined {
    return this.pets.find((pet) => pet.id === id);
  }

  editarMascota(updatedPet: Mascota) {
    const index = this.pets.findIndex((pet) => pet.id === updatedPet.id);
    if (index !== -1) {
      this.pets[index] = updatedPet;
      this.savePets();
    }
  }

  eliminarMascota(id: number) {
    const index = this.pets.findIndex((pet) => pet.id === id);
    if (index !== -1) {
      this.pets.splice(index, 1);
      this.savePets();
    }
  }

  private getNextId(): number {
    const maxId = this.pets.reduce((max, pet) => (pet.id > max ? pet.id : max), 0);
    return maxId + 1;
  }

  private savePets() {
    localStorage.setItem('mascotas', JSON.stringify(this.pets));
  }
}
