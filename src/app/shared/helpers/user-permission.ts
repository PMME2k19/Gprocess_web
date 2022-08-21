import { ProfileLevelEnum } from "src/app/base-enums/profile-level.enum";
import { AuthDataService } from "src/app/core/services/auth-data.service";

export class UserPermission{

  authDataService: AuthDataService

  constructor(){
    this.authDataService = new AuthDataService();
  }

  hasPermission() {
    const userProfileLevel = this.authDataService.getUserProfile() as ProfileLevelEnum;

    switch(userProfileLevel){
      case ProfileLevelEnum.Admin:
        return true;
      case ProfileLevelEnum.Director:
        return true;
      case ProfileLevelEnum.Assistente:
        return false;
      default:
        return false;
    }
  }

}
