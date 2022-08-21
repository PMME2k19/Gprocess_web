import { Component, OnInit, Output } from '@angular/core';
import { AlertMsgService } from 'src/app/core/alert-messages/alert-msg.service';

@Component({
  selector: 'app-alert-msg',
  templateUrl: './alert-msg.component.html',
  styleUrls: ['./alert-msg.component.css']
})
export class AlertMsgComponent implements OnInit {

  constructor(public alertMsgService : AlertMsgService) { }

  ngOnInit(): void {
  }

}
