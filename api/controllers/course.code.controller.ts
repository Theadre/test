import { JsonController, Param, Body, Get, Post, Put, Delete, UseBefore, Res } from 'routing-controllers';
import { CourseCode } from '../model/models';
import { Response } from 'express';
import { getRepository, Repository, Like, FindManyOptions } from 'typeorm';

@JsonController('/coursecode')
export class CourseCodeController {

  private service = getRepository(CourseCode);

  @Get('/getAll/:startIndex/:pageSize/:sortBy/:sortDir/:id')
  async getAll(@Param('startIndex') startIndex, @Param('pageSize') pageSize
    , @Param('sortBy') sortBy, @Param('sortDir') sortDir: string, @Param('id') id) {

    const opts: FindManyOptions = { 
      where: { courseId: id},
      skip: startIndex, 
      take: pageSize, 
      order: { [sortBy]: sortDir.toUpperCase() as any} 
    }

    return await this.service.findAndCount(opts);
  }

  @Post('/post')
  async post(@Body() model: CourseCode) {
    return await this.service.save(model);
  }

  @Put('/put/:id')
  async put(@Param('id') id: number, @Body() model: CourseCode) {
    return await this.service.update(id, model);
  }

  @Get('/get/:id')
  async get(@Param('id') id: number) {
    return await this.service.findOne(id);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number) {
    return await this.service.delete(id);
  }

}
