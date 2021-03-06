import { requests } from '../../request';
import { Component, OnInit, ViewChild, AfterContentChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestSummaryComponent } from '../../requests/request-summary/request-summary.component';

@Component({
  selector: 'app-request-acceptance',
  templateUrl: './request-acceptance.component.html',
  styleUrls: ['./request-acceptance.component.css']
})
export class RequestAcceptanceComponent implements OnInit, AfterContentChecked {
  request;
  completed;

  @ViewChild(RequestSummaryComponent, {static: true}) RequestSummary;

  constructor(public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.request = requests[+params.get('id') - 1];
    });
  }

  ngAfterContentChecked() {
    this.completed = (this.RequestSummary.reqStatus === 3);
  }

}
