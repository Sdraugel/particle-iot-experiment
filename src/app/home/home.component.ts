import {
  Component, OnInit
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../shared/data-service';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'div.tile1',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public messageForm: FormGroup;
  public photons: object[] = [{ id: '380054000651353530373132' }];
  private selectedPhoton = '';

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
    this.messageForm = this.formBuilder.group({
      selectedPhoton: ['', Validators.required],
      message: [, Validators.required]
    });
  }

  public save() {
    this._data.sendMessage(this.messageForm.value.message, this.selectedPhoton).subscribe(() => {
    });
  }

  public clear() {
    this.messageForm.patchValue({ message: '' });
    this._data.sendMessage('', this.selectedPhoton, true).subscribe(() => { });
  }

  public selectionChanged() {
    this.selectedPhoton = this.messageForm.value.selectedPhoton;
  }
}
