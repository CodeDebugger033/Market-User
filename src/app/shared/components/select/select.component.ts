import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input() title: string = '';
  @Input() data: any[] = [];
  @Output() selectedData = new EventEmitter();
  constructor() { }

  detectChanges(event: any) {
    this.selectedData.emit(event);
  }

}
