import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datos'
})
export class DatosPipe implements PipeTransform {

  transform(id: number, desc: string): string {

    return null;
  }

}
