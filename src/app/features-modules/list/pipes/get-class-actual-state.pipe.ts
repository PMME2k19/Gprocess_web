import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getClassActualState'
})
export class GetClassActualStatePipe implements PipeTransform {

  transform(value: string): string {
    let resultPipe = 'default';

    switch(value) {

      case "Registado":
        resultPipe = "criado";
        break;
      case "Em Despacho":
        resultPipe = "despacho-solicitado";
        break;
      case "Despachado":
        resultPipe = "despachado";
        break;
      case "Em Análise":
        resultPipe = "em-analise";
        break;
      case "Arquivado":
        resultPipe = "arquivado";

    }
    
    return resultPipe;
  }

}
