import { BaseEntity } from "../base/base-entity";

export class User extends BaseEntity {
    Nome: string;
    Email: string;
    Perfil: string;
    Token: string;
    RefreshTken: string;
    IsFirstAcess: boolean;

    constructor(
        nome: string,
        email: string,
        perfil: string,
        token: string,
        refreshTken: string,
        id: string,
        isFirstAcess: boolean
    ) {

        super(id)

        this.Nome = nome;
        this.Email = email;
        this.Perfil = perfil;
        this.Token = token;
        this.RefreshTken = refreshTken;
        this.IsFirstAcess = isFirstAcess;

    }
}
