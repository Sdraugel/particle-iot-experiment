import {
  Component
} from '@angular/core';
import { SkyTileDashboardConfig } from '@skyux/tiles';
import { HomeComponent } from './home.component';
import { ExpansionModuleComponent } from '../expansion-module/expansion-module.component';

@Component({
  selector: 'app-home-tile',
  templateUrl: './home-tile.component.html'
})
export class HomeTileComponent {
  public dashboardConfig: SkyTileDashboardConfig;

  constructor() {
    this.dashboardConfig = {
      tiles: [
        {
          id: 'tile1',
          componentType: HomeComponent
        },
        {
          id: 'tile2',
          componentType: ExpansionModuleComponent
        }
      ],
      layout: {
        singleColumn: {
          tiles: [
            {
              id: 'tile1',
              isCollapsed: false
            },
            {
              id: 'tile2',
              isCollapsed: false
            }
          ]
        },
        multiColumn: [
          {
            tiles: [
              {
                id: 'tile1',
                isCollapsed: false
              },
              {
                id: 'tile2',
                isCollapsed: false
              }
            ]
          }
        ]
      }
    };
  }
}
