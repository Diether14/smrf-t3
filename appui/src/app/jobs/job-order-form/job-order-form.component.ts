import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';
import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-job-order-form',
  templateUrl: './job-order-form.component.html',
  styleUrls: ['./job-order-form.component.css',
              '../job-order/job-order.component.css',
              './../../requests/request/request.component.css']
})
export class JobOrderFormComponent implements OnInit {
  jobOrderWorkRequired: string = null;
  jobOrderIssuedTo: number = null;
  jobOrderEstDateRequired: string = null;
  jobOrderMaterials = 0;
  jobOrderManpower = 0;
  jobOrderStatusReport;
  jobOrderDateStarted;
  jobOrderDateFinished;
  jobOrderDowntime;
  jobOrderNotes;
  jobOrderStatus;
  jobOrderFindings;

  resEstimatedCompletion: string;
  resWorkRequired: string;
  resIssuedTo: string;

  attrOther = false;

  btnTxt = 'Create';
  btnCancel = 'Cancel';

  manpowerList = [];
  materialList = [];
  @Input() requestDetails;
  @Input() manageRequest;
  @Input() requestCompleted;
  @Input() createNew;
  outputManpowerId = 0;
  userLevel: string;
  chief: any;
  jobCompleted = false;
  apiReponse;
  msg = true;
  msgTxt = '';
  acceptance = '';
  requestStatus;
  requestRepresentativeID;
  userLoggedInID;
  approvedByID;
  createdByID;
  buttonVisibility = false;
  acceptanceVisibility = false;

  constructor(public userService: UserService,
              public route: ActivatedRoute,
              public http: HttpClient,
              public router: Router) { }

  async ngOnInit() {
    await this.getChief();
    this.userLevel = this.userService.userLevel;

    if (this.manageRequest === true) {
      this.attrOther = true;
      this.btnTxt = 'UPDATE';
      await this.getJob();
    }

    if (this.requestCompleted === true) {
      this.btnTxt = 'ACCEPT';
      this.btnCancel = 'REJECT';
      await this.getJob();
    }
  }

  async getChief() {
    let url;
    // url = 'http://t2apps.tailinsubic.com/api/personnel/ ';
    url = '/localapi/dept/chief/' + this.userService.user.department;

    await this.http.get(url)
             .subscribe(
                res => {
                  this.chief = res;
                  this.chief.sort();
                },
                err => {
                  console.log(err);
                }
             );
  }

  async getJob() {
    const id = this.route.snapshot.paramMap.get('id');
    const url =  '/localapi/jobs/' + id;
    const keyJobs = 'jobs_order';
    const keyManpower = 'manpower';

    await this.http.get(url)
            .subscribe(
              res => {
                  this.resEstimatedCompletion = res[keyJobs][0].DATE_REQUIRED;
                  this.jobOrderEstDateRequired = res[keyJobs][0].DATE_REQUIRED;

                  this.resWorkRequired = res[keyJobs][0].WORK_REQUIRED;
                  this.jobOrderWorkRequired = res[keyJobs][0].WORK_REQUIRED;

                  this.resIssuedTo = res[keyJobs][0].NAME_ISSUED_TO;
                  this.jobOrderIssuedTo = res[keyJobs][0].ISSUED_TO;

                  this.jobOrderStatusReport = res[keyJobs][0].STATUS_REPORT;
                  this.jobOrderNotes = res[keyJobs][0].REMARKS;
                  this.jobOrderFindings = res[keyJobs][0].FINDINGS;

                  const ds = res[keyJobs][0].DATE_STARTED;
                  const df = res[keyJobs][0].DATE_FINISHED;

                  this.jobOrderDateStarted = ds ? moment(ds).format('Y/MM/DD HH:mm') : '';
                  this.jobOrderDateFinished = df ? moment(df).format('Y/MM/DD HH:mm') : '';
                  this.jobOrderDowntime = res[keyJobs][0].TOTAL_DOWNTIME;
                  this.manpowerList = res[keyManpower];
                  this.jobOrderStatus = res[keyJobs][0].STATUS;

                  this.requestStatus = res[keyJobs][0].REQ_STATUS;
                  this.requestRepresentativeID  = res[keyJobs][0].REP_PERSON_ID;
                  this.approvedByID  = res[keyJobs][0].APPROVED_BY;
                  this.userLoggedInID = this.userService.user.id;
                  this.createdByID = res[keyJobs][0].REQ_CREATED_BY;

                  this.displayValidation();
              },
              err => {
                console.log(err);
              }
            );
  }

  getManpower(data) {
    this.outputManpowerId = data;
  }

  btnAddManpower() {
    const manpowerName = $('#jobManpower').text();
    const manpowerID = this.outputManpowerId;

    if (!this.manpowerList.find(el => el.ID === manpowerID) && manpowerID > 0) {
      const json = {
          IS_NEW: 'true',
          M_ID: manpowerID,
          NAME: manpowerName
      };

      this.manpowerList.push(json);
    }

    $('#jobManpower').prop('selectedIndex', 0);
  }

  btnAddMaterial() {
    const materialID = this.jobOrderMaterials;
    const materialDescription = $('#jobOrderMaterials').text();

    if (!this.materialList.includes(materialDescription) && materialID > 0) {
      this.materialList.push(materialDescription);
    }

    this.jobOrderMaterials = 0;
  }

  removeMaterial(material) {
    const index = this.materialList.indexOf(material);
    this.materialList.splice(index, 1);

    return false;
  }

  restoreManpower(manpower) {
    this.manpowerList.find(el => {
      if (el.M_ID === manpower) {
        el.IS_NEW = 'true';
      }
    });

    return false;
  }

  removeManpower(manpower) {
    this.manpowerList.find(el => {
       if (el.M_ID === manpower) {
         el.IS_NEW = 'deleted';
       }
    });

    // this.manpowerList.splice(index, 1);
    return false;
  }

  completed() {
    this.jobCompleted = !this.jobCompleted;
  }

  subjectClosed(id) {
    const acceptance = this.acceptance;

    const subjectClosed = {
          id,
          acceptance
    };

    const url = '/localapi/completed';

    this.http.post(url, subjectClosed)
            .subscribe(
              res => {
                  console.log(res);
              },
              err => {
                  console.log(err);
              }
            );

    this.msgTxt = 'You have successfully closed a request.';
    this.msg = !this.msg;

    setTimeout(() => {
      this.router.navigate(['/manage-request']);
    }, 2000);
  }

  createJobOrder() {
    const id = this.route.snapshot.paramMap.get('id');
    const workDescription = this.jobOrderWorkRequired;
    const estimatedDate = this.jobOrderEstDateRequired;
    let error = 0;

    if (this.requestCompleted === true) {
      this.subjectClosed(id);
      return;
    }

    // if (id === null || workDescription === null || estimatedDate === null) {
    if (id === null || estimatedDate === null) {
        error = 1;
    } else {
      error = 0;
    }

    if (error === 0) {
        const json = {
          id,
          work_required: this.jobOrderWorkRequired,
          issued_to: this.jobOrderIssuedTo ? this.jobOrderIssuedTo : null,
          estimated_date: this.jobOrderEstDateRequired,
          materials: this.materialList,
          manpower: this.manpowerList,
          status_report: this.jobOrderStatusReport,
          date_started: this.jobOrderDateStarted ? moment(this.jobOrderDateStarted).format('YYYY/MM/DD HH:mm:ss') : null,
          date_finished: this.jobOrderDateFinished ? moment(this.jobOrderDateFinished).format('YYYY/MM/DD HH:mm:ss') : null,
          total_downtime: this.jobOrderDowntime,
          notes: this.jobOrderNotes,
          findings: this.jobOrderFindings,
          completed: this.jobCompleted
        };

        this.http.post('/localapi/jobs', json)
              .subscribe(res => {
                  this.apiReponse = res;

                  if (this.apiReponse.output === 'Y') {
                    if (this.jobCompleted === false) {
                      this.msgTxt = 'Successfully updated a job order.';
                    } else {
                      this.msgTxt = 'The job order has been completed.';
                    }

                    this.msg = !this.msg;
                    setTimeout(() => {
                      this.router.navigate(['/job']);
                    }, 2000);
                  }
              });
    }

  }

  otherInfo() {
    this.attrOther = !this.attrOther;
  }

  displayValidation() {
    // IF REQUEST IS NEW AND REPRESENTATIVE = USER LOGGED IN AND REQUEST STATUS < 3
    // IF USER LOGGED IN = DEPT. HEAD
    // IF USER LOGGED IN = REQUESTOR / CREATED THE REQUEST.
    // IF USER LOGGED IN = PERSON-IN-CHARGE / ISSUED TO AND REQUEST STATUS < 3

    if (this.requestStatus !== 4) {
      if (this.userLoggedInID === this.requestRepresentativeID && this.requestStatus < 3) {
        this.buttonVisibility = !this.buttonVisibility;
        this.acceptanceVisibility = !this.acceptanceVisibility;

      } else if (this.userLoggedInID === this.approvedByID) {
        this.buttonVisibility = !this.buttonVisibility;
        this.acceptanceVisibility = !this.acceptanceVisibility;

      } else if (this.userLoggedInID === this.createdByID) {
        this.buttonVisibility = !this.buttonVisibility;
        this.acceptanceVisibility = !this.acceptanceVisibility;

      } else if (this.userLoggedInID === this.jobOrderIssuedTo && this.requestStatus < 3) {
        this.buttonVisibility = !this.buttonVisibility;
        this.acceptanceVisibility = !this.acceptanceVisibility;
      }

    }

    console.log(this.userLoggedInID, this.requestRepresentativeID);
  }

}
