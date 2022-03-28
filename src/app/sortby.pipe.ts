import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortby'
})
export class SortbyPipe implements PipeTransform {

  transform(value: [], propName: string): [] {

    if (!value.length) {
      return value;
    }

    return value.sort((a,b) => a[propName] > b[propName] ? 1 : -1);

  }

}
