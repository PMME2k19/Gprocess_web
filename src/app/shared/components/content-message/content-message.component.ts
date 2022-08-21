import { Component, Input, OnInit } from '@angular/core';
import { ContentMessageEnum } from 'src/app/base-enums/content-message.enum';

@Component({
  selector: 'app-content-message',
  templateUrl: './content-message.component.html',
  styleUrls: ['./content-message.component.css']
})
export class ContentMessageComponent implements OnInit {

  @Input() option: ContentMessageEnum | null = ContentMessageEnum.SEARCH;
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() ilustracao: string = '';
  @Input() smallSize: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.selectMessage(this.option || ContentMessageEnum.SEARCH);
  }

  selectMessage(option: ContentMessageEnum){
    switch(option){
      case ContentMessageEnum.SEARCH:
        this.title = 'Sem resultados!';
        this.message = 'Desculpe, não há resultados para esta pesquisa, por favor tente outra!';
        this.ilustracao = 'assets/ilustracao/pesquisar_vazia.svg';
        break;
      case ContentMessageEnum.EMPTY:
        this.title = 'Sem conteúdo!';
        this.message = 'Desculpe, mas no momento essa secção não possui dados.';
        this.ilustracao = 'assets/ilustracao/sem_conteudo.svg';
        break;
      case ContentMessageEnum.NOTIFICATION:
        this.title = 'Sem notificações!';
        this.message = 'Desculpe, mas no momento não possui novas notificações.';
        this.ilustracao = 'assets/ilustracao/sem_notificacoes.svg';
        break;
    }
  }

}
