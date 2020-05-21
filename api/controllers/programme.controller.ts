import { JsonController, Param, Body, Get, Post, Put, Delete, UseBefore, Res } from 'routing-controllers';
import { Programme } from '../model/models';
import { Response } from 'express';
import { getRepository, Repository, Like, FindManyOptions } from 'typeorm';

@JsonController('/programme')
export class ProgrammeController {

  private service = getRepository(Programme);


  @Get('/getAll/:startIndex/:pageSize/:filter?')
  async getAll(@Param('startIndex') startIndex, @Param('pageSize') pageSize, @Param('filter') filter: string, @Res() response: Response) {
    const opts = {
      skip: startIndex,
      take: pageSize,
      relations: ['student'],
      where: { titre: Like(`%${filter === '*' ? '' : filter}%`) },
      order: { id: 'DESC' }
    }

    return await this.service.findAndCount(opts as any);
  }

  @Get('/getCreated/:startIndex/:pageSize/:idStudent/:filter')
  async getCreated(@Param('startIndex') startIndex, @Param('pageSize') pageSize
    , @Param('idStudent') idStudent, @Param('filter') filter: string, @Res() response: Response) {

    const studentId = response.locals.jwtPayload.studentId as number;

    let opts = {
      skip: startIndex,
      take: pageSize,
      relations: ['student'],
      where: { studentId: idStudent, titre: Like(`%${filter === '*' ? '' : filter}%`) },
    }

    return await this.service.findAndCount(opts);
  }

  @Post('/post')
  async post(@Body() model: Programme) {
    return await this.service.save(model);
  }

  @Put('/put/:id')
  async put(@Param('id') id: number, @Body() model: Programme) {
    return await this.service.update(id, model);
  }

  @Get('/get/:id')
  async get(@Param('id') id: number, @Res() response: Response) {

    const studentId = response.locals.jwtPayload.studentId as number;

    const p2 = await this.service.createQueryBuilder('p')
      .leftJoinAndSelect("p.student", "student")
      .leftJoinAndSelect("p.courses", "courses")
      .where("p.id = :id", { id: id })
      .getOne()
      ;

    return p2;
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number) {
    return await this.service.delete(id);
  }

}
