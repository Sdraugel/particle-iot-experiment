import {
  Component, OnInit
} from '@angular/core';
import { DataService } from '../shared/data-service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private _data: DataService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  public ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public save() {
    this._data.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(res => {
      localStorage.setItem('ACCESS_TOKEN', res);
      if (localStorage.getItem('ACCESS_TOKEN') !== undefined) {
        this.router.navigateByUrl('/home');
      }
    });
  }

}
