import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/core/services/app.service';
import { AuthDataService } from 'src/app/core/services/auth-data.service';
import { SelectInput } from 'src/app/shared/components/select-input/select-input.model';
import { SelectUser } from 'src/app/shared/components/select-user/select-user.model';
import { UserPermission } from 'src/app/shared/helpers/user-permission';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { AddProcessFacade } from '../../../add-process.facade';
import { NivelAcessoEnum } from '../../../enums/nivel-acesso.enum';
import { NewProcessModel } from '../../../models/new-process.model';

@Component({
  selector: 'app-add-process',
  templateUrl: './add-process.component.html',
  styleUrls: ['./add-process.component.css']
})
export class AddProcessComponent implements OnInit {

  userProfileLevel = new UserPermission();
  nivelAcessoEnum = NivelAcessoEnum;

  processo!: FormGroup;
  nivelAcesso = new FormControl(NivelAcessoEnum.Publico);

  actualDate: any;

  isLoadingTypes$: Observable<boolean>;
  isLoadingUsers$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  listType: SelectInput [] = [];

  listUsers: SelectInput [] = [];

  listMultipleUsers: SelectUser [] = [];

  constructor(
    private fb: FormBuilder,
    private addProcessFacade: AddProcessFacade,
    private appService: AppService,
    private notificationService: NotificationService,
    private authDataService: AuthDataService
  )
  {
    this.isLoadingTypes$ = addProcessFacade.getObservableIsLoadingTypes();
    this.isLoadingUsers$ = addProcessFacade.getObservableIsLoadingUsers();
    this.isLoading$ = addProcessFacade.getObservableIsLoading();
  }

  async ngOnInit() {
    this.actualDate = new Date;

    this.processo = this.fb.group({
      numeroProcesso: ['', Validators.required],
      dataEmissaoProcesso: ['', Validators.required],
      dataEntrega: ['', Validators.required],
      tipoProcessoId: ['', Validators.required],
      protocoloId: ['', Validators.required],
      proveniencia: ['', Validators.required],
      assunto: ['', Validators.required],
      acessosPrivado: [[]]
    });

    await this.getProcessTypes();
    await this.getUserList();
  }

  async createProcess() {
    if (this.processo.invalid) return;

    const formProcess = this.processo.value;

    if(!this.appService.validateDate(formProcess.dataEmissaoProcesso)){
      this.notificationService.warning("Data de emissão não pode ser maior que a data actual.");
      return;
    }

    if(!this.appService.validateDate(formProcess.dataEntrega)){
      this.notificationService.warning("Data de entrega não pode ser maior que a data actual.");
      return;
    }

    const nivelAcesso = this.nivelAcesso.value != NivelAcessoEnum.Privado ? 0 : 1;

    const process: NewProcessModel = {
      numeroProcesso: formProcess.numeroProcesso,
      dataEmissaoProcesso: formProcess.dataEmissaoProcesso,
      dataEntrega: formProcess.dataEntrega,
      tipoProcessoId: formProcess.tipoProcessoId.id,
      proveniencia: formProcess.proveniencia,
      nivelAcesso: nivelAcesso,
      protocoloId: formProcess.protocoloId.id,
      acessosPrivado: formProcess.acessosPrivado,
      assunto: formProcess.assunto
    };

    const result = await this.addProcessFacade.createProcess(process);

    if(result){
      this.processo.reset();
    }
  }

  async getProcessTypes(){
    this.listType = await this.addProcessFacade.getDocTypes();
  }

  async getUserList(){
    const users = await this.addProcessFacade.getUsersList();
    const userId = this.authDataService.getUserId();
    this.listMultipleUsers = users.filter(x => x.id != userId);
    this.listUsers = users.map((x: any) => { return {id: x.id, nome: x.primeiroNome + ' ' + x.ultimoNome} });
  }

}
