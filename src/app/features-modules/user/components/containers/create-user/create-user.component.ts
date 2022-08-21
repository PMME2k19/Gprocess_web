import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { TipoUtilizador } from '../../../enums/tipo-utilizador.enum';
import { UserFacade } from '../../../facades/user.facade';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  user!: FormGroup;
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
    this.user = this.fb.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      perfil: ['', Validators.required],
      contactoTelefonico: ['', Validators.required]
    });
  }

  async createUser(){

    if (this.user.invalid) return;

    this.loading = true;

    const user = this.user.value;
    const name = user.nome.trim().split(' ');
    const primeiroNome = name[0];
    const ultimoNome = name[name.length-1];
    const userName = this.removeSpecialChar(primeiroNome + '.' + ultimoNome);

    const newUser = {
      primeiroNome: primeiroNome,
      ultimoNome: ultimoNome,
      email: user.email.trim(),
      userName: userName,
      perfil: user.perfil.nome,
      contactoTelefonico: user.contactoTelefonico
    };

    //console.log('value: ', newUser);

    const result = await this.userFacade.addUser(newUser);
    this.loading = false;

    if (result) {
      this.modalService.closeModal();
    }

  }

  removeSpecialChar(especialChar: string): string{
    especialChar = especialChar.toLowerCase();
    especialChar = especialChar.replace(/[áàãâä]/g, 'a');
    especialChar = especialChar.replace(/[éèêë]/g, 'e');
    especialChar = especialChar.replace(/[íìîï]/g, 'i');
    especialChar = especialChar.replace(/[óòõôö]/g, 'o');
    especialChar = especialChar.replace(/[úùûü]/g, 'u');
    especialChar = especialChar.replace(/[ç]/g, 'c');
    return especialChar;
  }

}
