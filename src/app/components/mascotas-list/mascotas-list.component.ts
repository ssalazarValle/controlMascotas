import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MascotasService } from 'src/app/services/mascotas.service';
import { Mascota } from 'src/interfaces/mascota';
import { MascotasFormComponent } from '../mascotas-form/mascotas-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MascotasEditComponent } from '../mascotas-edit/mascotas-edit.component';
import { MascotasDeleteComponent } from '../mascotas-delete/mascotas-delete.component';

@Component({
  selector: 'app-mascotas-list',
  templateUrl: './mascotas-list.component.html',
  styleUrls: ['./mascotas-list.component.scss'],
})
export class MascotasListComponent implements OnInit {
  mascotas: Mascota[] = [];
  dataSource!: MatTableDataSource<Mascota>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  public clickedRows = new Set<Mascota>();

  displayedColumnsPets: string[] = [
    'nombre',
    'raza',
    'edad',
    'editar',
    'eliminar',
  ];

  constructor(
    private mascotasService: MascotasService,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.sort = new MatSort();
/*     let data: Mascota = {
      nombre: 'Zeus',
      raza: 'Pequena',
      edad: 1,
    };

    this.mascotasService.addMascota(data); */
    this.getDataGrid();
  }

  ngOnInit(): void {
    this.getDataGrid();
  }

  getDataGrid(): void {
    const data = localStorage.getItem('mascotas');
    if (data) {
      let newData = JSON.parse(data);
      this.dataSource = new MatTableDataSource(newData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      this.mascotas = this.mascotasService.getMascotas();
      this.dataSource = new MatTableDataSource(this.mascotas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  editData(data: Mascota, action: string): void {
    switch (action) {
      case 'edit':
        let dialogRef = this.dialog.open(MascotasEditComponent, {
          data
        });

        dialogRef.afterClosed().subscribe(() => {
          this.getDataGrid();
        });

        break;
      case 'delete':
        let dialogRefDelete = this.dialog.open(MascotasDeleteComponent, {
          data,
        });

        dialogRefDelete.afterClosed().subscribe((res) => {
          this.mascotasService.eliminarMascota(res.id);
          this.getDataGrid();
        });

        break;
    }
  }

  openModal(): void {
    const dialogRef = this.dialog.open(MascotasFormComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.getDataGrid();
    });
  }
}
