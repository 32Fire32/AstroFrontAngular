// in angular why this pipe gives me the error: ERROR TypeError: it.includes is not a function


import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
  /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param items list of elements to search in
   * @param searchObj search string
   * @returns list of elements filtered by search Obj or []
   */
  transform(items: any[], input: any): any {

    input = input.toLowerCase();

    if(input){
      return items.filter(it => it.name.toLowerCase().includes(input))
    } else {
      return [];
    }
  }
}
