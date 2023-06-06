import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PAGINATION_ARROW } from '../../models/enums/pagination-enum/pagination.enum';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input('elementLenght') elementLenght: number = 0;
  @Output() paginationEvent = new EventEmitter();

  elementPerPage: number = 20 // page size

  PAGINATION_ARROW = PAGINATION_ARROW
  pageList: number[] = [20, 50, 100]
  totalPage: number = 1

  pageNumber: number = 1

  constructor() { }

  ngOnInit(): void {
    this.calculatePages()
  }

  calculatePages() {
    const pages = this.elementLenght / this.elementPerPage
    this.pageNumber = Math.floor(pages)
  }

  selectedPageEvent(event: any) {
    const selectedNum = Number(event.target.value)
    this.pageNumber = 1
    this.elementPerPage = selectedNum

    this.calculatePages()
    this.submitResult()
  }

  pageNumberEvent(event: any) {
    const pageNumber = Number(event.target.value)
    this.pageNumber = pageNumber
    this.submitResult()
  }

  arrowEvent(arrowDirection: PAGINATION_ARROW) {

    const elementDisplayedElement = this.pageNumber * this.elementPerPage
    const maxLimit = elementDisplayedElement < this.elementLenght;

    if (arrowDirection === PAGINATION_ARROW.NEXT && maxLimit) {
      this.pageNumber++
      this.submitResult()
      return
    }

    const minLimit = (elementDisplayedElement - this.elementPerPage) >= 10;

    if (arrowDirection === PAGINATION_ARROW.PREVIOUS && minLimit) {
      this.pageNumber--
      this.submitResult()
    }
  }

  doubleArrowEvent(doubleArrowDirection: PAGINATION_ARROW) {
    if (doubleArrowDirection === PAGINATION_ARROW.FIRST_PAGE) {
      this.pageNumber = 1
      this.submitResult()
      return
    }

    if (doubleArrowDirection === PAGINATION_ARROW.LAST_PAGE) {
      this.pageNumber = this.elementLenght / this.elementPerPage
      this.submitResult()
    }
  }

  submitResult() {
    this.paginationEvent.next({ pageNumber: this.pageNumber, size: this.elementPerPage })
  }

}
