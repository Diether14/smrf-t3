import { ActivityService } from './../../../services/activity.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivityFactory } from 'src/app/classes/activity-factory';

@Component({
  selector: 'app-add-row',
  templateUrl: './add-row.component.html',
  styleUrls: ['./add-row.component.css']
})
export class AddRowComponent implements OnInit {

  startTime: string;
  endTime: string;
  fullStartTime: any;
  fullEndTime: any;
  actualStart: string;
  dateSelected: Date;
    constructor(private activityFactory: ActivityFactory, private activeModal: NgbActiveModal, private activityService: ActivityService, ) {
    this.startTime = '';
    this.endTime = 'HHmm';
  }

  ngOnInit() {
  }

  limit(val= '', key) {
    const pattern = /^['0-9']$/i;
    const count = val.toString().length;

    if (pattern.test(key)) {
      if (count === 4) {
        return false;
      }
    }
  }

  updateEndTime() {
    if (this.startTime.length === 4 ) {
      const time = this.startTime.slice(0, 2);
      const min = this.startTime.slice(2, 4);
      const timeStr = moment(this.dateSelected).format('MM/DD/YYYY') + ' ' + time + ':' + min;
      this.fullStartTime = moment(timeStr);
      this.fullEndTime = moment(this.fullStartTime).add(1, 'hours').startOf('hour');
      const endTimeObj = moment(this.fullEndTime).format('HHmm');
      this.endTime = endTimeObj;
    } else {
      this.endTime = 'HHmm';
    }
  }

  addRow() {
    const act = this.activityFactory.createActivity({
      HEADER_ID       : this.activityService.headerObj.ID,
      START_TIME      : this.fullStartTime,
      END_TIME        : this.fullEndTime,
      LAST_UPDATED_BY : null,
      DATE_ENTERED    : this.activityService.servertime.format('DD/MMM/YY'),
      DATE_UPDATED    : this.activityService.servertime.format('DD/MMM/YY'),
      IS_NEW          : 1,
      IS_CHANGED      : 0
    });
    if (this.activityService.isActivityAllowed(act.START_TIME)) {
      this.activityService.addCustomActivity(act);
    }
  }

}
