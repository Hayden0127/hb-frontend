import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-scheduleinstall',
  templateUrl: './scheduleinstall.component.html',
  styleUrls: ['./scheduleinstall.component.scss']
})
export class ScheduleinstallComponent implements OnInit {
  title: string = "Schedule Install Now";
  description: string = "Please key-in all of the information below and click Continue.";
  date:any;
  time:any;
  @ViewChild('detailsForm') detailsForm: NgForm;

  connectorList: any;
  
  constructor(private modal: NgbModal) { }

  ngOnInit(): void {
    this.connectorList = ["Station 1", "station 2", "Station 3"]
  }

   remove(index) {
    this.connectorList.splice(index, 1);
  }

}
