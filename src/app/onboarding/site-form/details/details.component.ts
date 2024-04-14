import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { CreateFormService, SiteProfile } from 'src/app/shared-service/onboarding/create-form.service';
import { OnBoardingService } from 'src/app/shared-service/onboarding/onboarding.service';
import { ResponseHandlingService } from 'src/app/shared-utilities/response';
import { regexValidation, statusCode } from 'src/app/shared-utilities/system-data';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  regexValidation = regexValidation;
  locationInput: string;

  siteProfileDetails: SiteProfile;
  clicked: boolean = false;
  viewMode: string;

  @ViewChild('detailsForm') detailsForm: NgForm;

  private notifier: NotifierService;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private createFormService: CreateFormService,
    private onBoardingService: OnBoardingService,
    private responseService: ResponseHandlingService,
    notifier: NotifierService) {
    this.notifier = notifier
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.viewMode = params.view
    })

    this.siteProfileDetails = this.createFormService.getSiteProfileData();
    if (this.siteProfileDetails == null) this.siteProfileDetails = new SiteProfile;
  }

  back() {
    this.router.navigate([`overview/onboarding/${this.viewMode}/location`], { queryParams: { view: this.viewMode }, skipLocationChange: true });
  }

  next() {
    this.createFormService.setSiteProfileData(this.siteProfileDetails);
    this.router.navigate([`overview/onboarding/${this.viewMode}/program`], { queryParams: { view: this.viewMode }, skipLocationChange: true });
  }

  numberOnly($event) {
    if ($event.keyCode == 43) return true

    if ($event.keyCode < 48 || $event.keyCode > 57)
      return false;
  }
}
