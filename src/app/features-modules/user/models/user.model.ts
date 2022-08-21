import { BaseEntity } from "src/app/base-models/base/base-entity";

export class UserModel extends BaseEntity {
  primeiroNome: string = "";
  ultimoNome: string = "";
  identityId: string = "";
  userName: string = "";
  isBloqueado: boolean = false;
  email: string = "";
  perfil: string = "";
  contactoTelefonico: string = "";
}
