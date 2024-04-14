import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Marker } from 'src/app/shared-models/onboarding/create-form';
import { CreateFormService, OnBoardingCPForm } from 'src/app/shared-service/onboarding/create-form.service';
import { OnBoardingService } from 'src/app/shared-service/onboarding/onboarding.service';
import { ResponseHandlingService } from 'src/app/shared-utilities/response';
import { statusCode, validationMessage, markerIconUrl } from 'src/app/shared-utilities/system-data';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  displayFormData: OnBoardingCPForm = new OnBoardingCPForm;
  marker: Marker = new Marker();
  zoom: number = 18;
  clicked: boolean = false;
  markerIconUrl = markerIconUrl;

  private notifier: NotifierService;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private createFormService: CreateFormService,
    private onBoardingService: OnBoardingService,
    private responseService: ResponseHandlingService,
    notifier: NotifierService) {
    this.notifier = notifier;
  }

  ngOnInit(): void {
    this.displayFormData = this.createFormService.getCPFormData();
    this.marker.latitude = this.displayFormData.siteDetails.latitude;
    this.marker.longitude = this.displayFormData.siteDetails.longitude;
    this.marker.draggable = false;
  }

  back() {
    this.router.navigate([`overview/onboarding/new-cp/connector`], { skipLocationChange: true });
  }

  confirm() {
    this.clicked = true;
    this.onBoardingService.createNewCPOnBoarding(this.displayFormData).subscribe(data => {
      switch (data.success) {
        case true: {
          this.createFormService.resetCPFormData();
          this.notifier.notify('success', `Successfully created on boarding record.`)
          setTimeout(() => {
            this.router.navigate(['overview'])
          }, 1200)
          break;
        }
        case false: {
          let message = 'Oops! Something went wrong.'
          this.notifier.notify('error', message)
          break;
        }
      }
      this.clicked = false;
    }, (error) => {
      this.clicked = false;
      this.notifier.notify('error', error)
    })
  }

  mapReady(map: any) {
    map.setOptions({
      styles: [
        {
          featureType: "poi",
          stylers: [{ visibility: "off" }]
        }
      ]
    });
  }
}
