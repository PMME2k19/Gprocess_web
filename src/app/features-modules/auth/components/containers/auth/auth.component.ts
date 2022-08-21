import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertMsgService } from 'src/app/core/alert-messages/alert-msg.service';
import { ResponseEnum } from 'src/app/base-enums/response-enum';
import { UserLogin } from 'src/app/base-models/auth/UserLogin';
import { AuthService } from '../../../api/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css', './auth.component.resp.css']
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

}
