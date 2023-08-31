import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabnavAdminPage } from './tabnav-admin.page';

const routes: Routes = [
  {
    path: '',
    component: TabnavAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabnavAdminPageRoutingModule {}
