import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { TipoUtilizador } from '../../../enums/tipo-utilizador.enum';
import { UserModel } from '../../../models/user.model';
import { UserFacade } from '../../../facades/user.facade';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  @Input() currentUser!: UserModel;

  userForm!: FormGroup;
  loading = false;

  listUsersTypes = [
    {id: 0, nome: TipoUtilizador.Admin},
    {id: 1, nome: TipoUtilizador.Director},
    {id: 2, nome: TipoUtilizador.Assistente}
  ];

  constructor(
    private fb: FormBuilder,
    private userFacade: UserFacade,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      nome: [this.currentUser.primeiroNome + ' ' + this.currentUser.ultimoNome, Validators.required],
      email: [this.currentUser.email, Validators.required],
      perfil: [this.getCurrentPerfil(), Validators.required],
      contactoTelefonico: [this.currentUser.contactoTelefonico, Validators.required]
    });
  }

  getCurrentPerfil(){
    return this.listUsersTypes.find(x => x.nome == this.currentUser.perfil);
  }

  cleanFields() {
    this.userForm.controls['nome'].reset();
    this.userForm.controls['perfil'].reset();
    this.userForm.controls['contactoTelefonico'].reset();
  }

  async editUser(){

    if (this.userForm.invalid) return;

    this.loading = true;

    const user = this.userForm.value;
    const name = user.nome.trim().split(' ');
    const primeiroNome = name[0];
    const ultimoNome = name[name.length-1];

    const userUpdated = {
      id: this.currentUser.id,
      primeiroNome: primeiroNome,
      ultimoNome: ultimoNome,
      email: user.email.trim(),
      perfil: user.perfil.nome,
      contactoTelefonico: user.contactoTelefonico,
      isBloqueado: this.currentUser.isBloqueado
    };

    //console.log('value: ', userUpdated);

    const result = await this.userFacade.editUser(userUpdated);
    this.loading = false;

    if (result) {
      this.modalService.closeModal();
    }

  }

}
