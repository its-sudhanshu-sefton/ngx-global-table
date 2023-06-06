import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ARROW_DIRECTION } from './models/enums/table-enum/table.enum';
import { MenuOption, TableData, TableHeader } from './models/interfaces/table-interface/table.interface';
import { MENU_OPTIONS } from './models/enums/menu-enum/menu.enum';

interface config {
  arrowDirection: ARROW_DIRECTION
}

interface Header extends TableHeader {
  id?: number,
  config?: config
}


@Component({
  selector: 'ngx-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent {

  @Input('tableHeader') tableHeader: Header[] = []
  @Input('tableData') tableData: TableData[] = []
  @Input('menuOption') menuOption: string[] = [MENU_OPTIONS.EDIT]
  @Input('totalElement') totalElement: number = 0

  @HostListener('click', ['$event.target'])
  clickEvent() {
    this.closeDialogs()
  }

  @Output() sortingtEvent = new EventEmitter()
  @Output() menuEvent = new EventEmitter<MenuOption>()
  @Output() paginationEvent = new EventEmitter()


  menuPosition: { x: string, y: string } = { x: '', y: '' }

  activityList: any[] = []

  ARROW_DIRECTION = ARROW_DIRECTION
  arrowDirection: ARROW_DIRECTION = ARROW_DIRECTION.UP
  selectedRow: any

  isActivityVisible: boolean = false

  constructor() { }

  ngOnInit(): void {
    this.initTableHeader()
    this.generateActivityList()
  }

  initTableHeader() {
    const modifiedHeader = this.tableHeader.map((tHeader: TableHeader, index) => {
      return { ...tHeader, id: index, config: { arrowDirection: ARROW_DIRECTION.UP } }
    })

    this.tableHeader = modifiedHeader
  }

  generateActivityList() {
    this.activityList = this.tableHeader.map((el: TableHeader) => {
      return { ...el, isChecked: true }
    })
  }

  sortHeaderEvent(d: ARROW_DIRECTION | any, fieldName: string, index: number) {

    const arrowDirection = this.tableHeader[index].config as config

    if (d === ARROW_DIRECTION.UP) arrowDirection.arrowDirection = ARROW_DIRECTION.DOWN
    else arrowDirection.arrowDirection = ARROW_DIRECTION.UP

    this.sortingtEvent.next({ direction: arrowDirection.arrowDirection, fieldName })

  }

  changeEvent({ target }: any) {
    const { value, checked } = target

    if (checked) {
      // adding back element to original postion
      const removedEl = this.activityList.find((el) => el.value === value)
      this.tableHeader.push(removedEl)
      this.tableHeader = this.tableHeader.sort((a: TableHeader | any, b: TableHeader | any) => a.id - b.id)

    }
    else {
      // removing element
      const index = this.tableHeader.findIndex((el) => el.value === value)
      this.tableHeader.splice(index, 1)
    };
  }

  openMenu(event: any, selectedRow: any) {
    event.stopPropagation()
    this.selectedRow = selectedRow

    this.menuPosition.x = event.clientX + 10 + 'px'
    this.menuPosition.y = event.clientY + 'px'
  }

  selectedMenuOptionEvent(e: any) {
    this.menuEvent.next({ optionType: e, rowDetails: this.selectedRow })
  }

  closeDialogs() {
    this.menuPosition = { x: '', y: '' }
    this.isActivityVisible = false
  }

  ngOnDestroy(): void {
    this.menuEvent.complete()
    this.sortingtEvent.complete()
    this.paginationEvent.complete()
  }


}
