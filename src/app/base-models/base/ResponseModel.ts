import { ResponseEnum } from "src/app/base-enums/response-enum";

export class ResponseModel{

    responseEnum: ResponseEnum = ResponseEnum.SUCCESS;

    responseMsg: string = '';

    data: any;

    constructor(responseEnum: ResponseEnum, data: any) {
        this.responseEnum = responseEnum;
        this.data = data;
    }
}