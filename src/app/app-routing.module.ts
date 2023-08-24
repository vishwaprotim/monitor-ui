import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormComponent } from './components/form/form.component';
import { HomeComponent } from './components/home/home.component';
import { ShowComponent } from './components/show/show.component';

const routes: Routes = [
  {
    path: 'api',
    component: FormComponent,
    pathMatch: 'full'

  },
  {
    path: 'show',
    component: ShowComponent,
    pathMatch: 'full'

  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
