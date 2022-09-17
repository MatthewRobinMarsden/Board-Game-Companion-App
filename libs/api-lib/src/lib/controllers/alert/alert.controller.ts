import { Controller, Body,  Get, Query, Post, Put, Delete, Req ,UploadedFile, UseInterceptors, Param, HttpException, HttpStatus } from '@nestjs/common';
import { AlertService } from '../../services/alert/alert.service';
import { AlertDocument } from '../../schemas/alert.schema';
import { user } from '../../models/general/user';


@Controller('comments')
export class ApiAlertController {
    constructor(private readonly alertService:AlertService){}    
    
    @Get('retreive-all-alerts')
    async getAllUserMessages(@Query('name')name:string,@Query('email')email:string):Promise<AlertDocument[]>{
        return this.alertService.getAllUserMessages({name:name,email:email});
    }

    @Put('mark-as-read')
    async markAsRead(id:string):Promise<AlertDocument>{
        return this.alertService.markAsRead(id);
    }
}
