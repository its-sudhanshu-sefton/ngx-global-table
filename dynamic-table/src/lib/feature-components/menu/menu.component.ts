import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input('menuOption') menuOption: string[] = []
  @Input('menuPosition') menuPosition = { x: '0px', y: '0px' }

  @Output() menuEvent = new EventEmitter()

  selectedOptionEvent(option: string) {
    this.menuEvent.next(option)
  }

}
