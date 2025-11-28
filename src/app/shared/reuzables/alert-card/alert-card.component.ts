import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-card.component.html',
  styleUrls: ['./alert-card.component.scss']
})
export class AlertCardComponent {

  @Input() type: 'success' | 'error' | 'warning' = 'success';
  @Input() title: string = 'Éxito';
  @Input() message: string = '';
  @Input() buttonText?: string;
  @Input() buttonAction?: () => void;

  close() {
    const closeBtn = document.querySelector('#toast-container .toast .toast-close-button') as HTMLElement;
    if (closeBtn) closeBtn.click();
  }
}
