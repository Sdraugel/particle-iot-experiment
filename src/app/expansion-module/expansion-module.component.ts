import {
  Component, OnInit
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../shared/data-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expansion-module',
  templateUrl: './expansion-module.component.html',
  styleUrls: ['./expansion-module.component.scss']
})
export class ExpansionModuleComponent implements OnInit {
  public expansionForm: FormGroup;
  public photons: object[] = [{ id: '380054000651353530373132' }];
  private selectedPhoton = '';

  public lightOptions = [
    {
      name: 'Lights On',
      status: true
    },
    {
      name: 'Lights Off',
      status: false
    }
  ];

  constructor(
    private _data: DataService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  public ngOnInit() {
    if (localStorage.getItem('ACCESS_TOKEN') === undefined) {
      this.router.navigateByUrl('/login');
    }
    this._data.getUserInfo().subscribe((response: any) => {
      let userEmail = response.email;
      let firstName = userEmail.split('.')[0];
      let lastName = userEmail.split('.')[1].split('@')[0];
      let user = `${firstName} ${lastName}`;
      localStorage.setItem('USER', user);
    });
    this.expansionForm = this.formBuilder.group({
      selectedPhoton: ['', Validators.required],
      angle: ['', [Validators.required, Validators.min(1), Validators.max(260)]],
      lightStatus: []
    });
  }

  public save() {
    this._data.setAngle(this.selectedPhoton,
      this.expansionForm.value.angle).subscribe(() => { });

    // this._data.setTurretLights(this.selectedPhoton, true).subscribe(() => { });
  }

  public selectionChanged() {
    this.selectedPhoton = this.expansionForm.value.selectedPhoton;
  }

}
