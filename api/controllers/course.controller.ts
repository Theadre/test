import { JsonController, Param, Body, Get, Post, Put, Delete, UseBefore, Res } from 'routing-controllers';
import { Course } from '../model/models';
import { Response } from 'express';
import { getRepository, FindManyOptions } from 'typeorm';

@JsonController('/courses')
export class CourseController {

  private service = getRepository(Course);

  @Get('/getAll/:startIndex/:pageSize/:sortBy/:sortDir/:id')
  async getAll(@Param('startIndex') startIndex, @Param('pageSize') pageSize
    , @Param('sortBy') sortBy, @Param('sortDir') sortDir, @Param('id') id) {

    const opts: FindManyOptions = { 
      where: { codeId: id},
      skip: startIndex, 
      take: pageSize, 
      order: { [sortBy]: sortDir} }

    return await this.service.findAndCount(opts);
  }

  @Post('/post')
  async post(@Body() model: Course) {
    return await this.service.save(model);
  }

  @Put('/put/:id')
  async put(@Param('id') id: number, @Body() model: Course) {
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
