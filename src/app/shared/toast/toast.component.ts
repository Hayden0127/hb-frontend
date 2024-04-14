import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastDetail } from 'src/app/shared-models/toast/toast';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [    
    trigger('toastTrigger', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(50%)' }),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({ transform: 'translateX(50%)' }))
      ])
    ])  
  ]
})

export class ToastComponent implements OnInit {
  @Input() data: ToastDetail;
  @Output() closeToastAction = new EventEmitter<boolean>();
  @Output() onProceedAction = new EventEmitter<boolean>();
  
  errorTitle: string;
  errorMessage: string;
  errorModalReference: any;

  isConfirmClicked: boolean = false;
  confirmCancellationModalReference: any;

  responseSuccess: boolean = false;
  responseTitle: string;
  responseDescription: string;
  responseModalReference: any;
  showToast: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.showToast = true;
  }
  
  onClose() {
    this.closeToastAction.emit(true);
    this.showToast = false;
  }

  onProceed(){
    this.onProceedAction.emit(true);
    this.showToast = false;
  }
}
