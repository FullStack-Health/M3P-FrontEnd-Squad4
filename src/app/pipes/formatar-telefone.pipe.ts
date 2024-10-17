import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatarTelefone',
  standalone: true
})
export class FormatarTelefonePipe implements PipeTransform {
  transform(telefone: string): string {
    return `(${telefone.substring(0, 2)}) ${telefone.substring(2, 3)} ${telefone.substring(3, 7)}-${telefone.substring(7)}`;
  }
}
