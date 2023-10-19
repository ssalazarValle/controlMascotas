import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MascotasListComponent } from './components/mascotas-list/mascotas-list.component';

const routes: Routes = [
  {
		path: '',
		redirectTo: '/petList',
		pathMatch: 'full'
	},
  {
    path: 'petList',
    component: MascotasListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
