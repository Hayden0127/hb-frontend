import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateFormService, MaintenanceProgram } from 'src/app/shared-service/onboarding/create-form.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {

  maintenanceProgram: string[] = ["Lite Green Service", "Pro Green 24/7 Service"];

  programDetails: MaintenanceProgram;
  viewMode: string;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private createFormService: CreateFormService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.viewMode = params.view
    })
    this.programDetails = this.createFormService.getMaintenanceProgramData();
  }

  back() {
    this.router.navigate([`overview/onboarding/${this.viewMode}/details`], { queryParams: { view: this.viewMode }, skipLocationChange: true });
  }

  next() {
    this.router.navigate([`overview/onboarding/${this.viewMode}/review`], { queryParams: { view: this.viewMode }, skipLocationChange: true });
    this.createFormService.setMaintenanceProgramData(this.programDetails)
  }
}
