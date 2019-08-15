import {
  NgModule
} from '@angular/core';

import {
  AppSkyModule
} from './app-sky.module';
import { DataService } from './shared/data-service';
import { SkyAuthHttpModule } from '@skyux/http';
import { SkyTilesModule } from '@skyux/tiles';
import { HomeComponent } from './home/home.component';
import { ExpansionModuleComponent } from './expansion-module/expansion-module.component';

@NgModule({
  exports: [
    AppSkyModule,
    SkyAuthHttpModule,
    SkyTilesModule
  ],
  providers:
    [DataService],
  entryComponents: [
    HomeComponent,
    ExpansionModuleComponent
  ]
})
export class AppExtrasModule { }
