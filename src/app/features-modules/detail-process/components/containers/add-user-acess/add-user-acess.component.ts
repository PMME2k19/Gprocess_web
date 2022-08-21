import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthDataService } from 'src/app/core/services/auth-data.service';
import { SelectUser } from 'src/app/shared/components/select-user/select-user.model';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { ProcessFacade } from '../../../process.facade';

@Component({
  selector: 'app-add-user-acess',
  templateUrl: './add-user-acess.component.html',
  styleUrls: ['./add-user-acess.component.css']
})
export class AddUserAcessComponent implements OnInit {

  @Input() processoId: string = '';

  acessos!: FormGroup;
  loading = false;

  isLoadingUsers$: Observable<boolean>;
  listMultipleUsers: SelectUser [] = [];

  constructor(
    private fb: FormBuilder,
    private processFacade: ProcessFacade,
    private modalService: ModalService,
    private authDataService: AuthDataService
  )
  {
    this.isLoadingUsers$ = processFacade.getObservableIsLoadingUsers();
  }

  async ngOnInit() {
    this.acessos = this.fb.group({
      processoId: [this.processoId],
      acessosPrivado: ['', Validators.required]
    });

    await this.getUserList();
  }

  async darAcessoPrivado() {
    if (this.acessos.invalid) return;

    this.loading = true;

    const formAcessosPrivados = this.acessos.value;
    formAcessosPrivados.processoId = this.processoId;

    //console.log('acesos: ', formAcessosPrivados)

    const result = await this.processFacade.AddUserAcess(formAcessosPrivados);

    this.loading = false;

    if (result) {
      this.modalService.closeModal();
    }
  }

  async getUserList(){
    const users = await this.processFacade.getUsersList();
    const userId = this.authDataService.getUserId();
    this.listMultipleUsers = users.filter(x => x.id != userId);
  }

}
