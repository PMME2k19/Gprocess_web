export class UserLogin{
    nomeUsuario: string;
    palavraPasse: string;
    remoteIpAddress: string = '';

    /**
     * UserLogin
     */
    constructor(user: string, palavraPasse: string) {
        this.nomeUsuario = user;
        this.palavraPasse = palavraPasse;
    }
}