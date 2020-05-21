import { Student, Programme, StudentProgramme, Course, CourseCode } from './models';
import * as faker from 'faker';
import Container from 'typedi';
import { StudentProgrammeRepository } from 'api/repository/student.programme.repository';
import { StudentRepository } from 'api/repository/student.repository';
import { ProgrammeRepository } from 'api/repository/programme.repository';
import { CourseRepository } from 'api/repository/course.repository';
import { CourseCodeRepository } from 'api/repository/course.code.repository';

export class FakeData {
  private serviceStudent = Container.get(StudentRepository);
  private serviceProgramme = Container.get(ProgrammeRepository);
  private serviceStudentProgramme = Container.get(StudentProgrammeRepository);
  private serviceCourse = Container.get(CourseRepository);
  private serviceCourseCode = Container.get(CourseCodeRepository);

  constructor() { }

  async insertSomeFakeData() {
    const i = await this.serviceStudent.count();
    if (i > 0) {
      return;
    }
    const count = 10;
    await this.addStudent(count);
    await this.addProgramme(count);
    await this.addCourse(count);
    await this.addStudentProgramme(count);
    await this.addCourseCode(count);
    console.log('Database seeding has done succesfully');
  }

  async addStudent(count) {
    const list = [...Array(count - 1).keys()].map(i => {
      const o = new Student();
      o.firstName = faker.name.firstName();
      o.lastName = faker.name.lastName();
      o.degree = faker.name.lastName();
      return o;
    });

    list.push({
      firstname: 'Pierre',
      lastname: 'Stone',
      degree: 'postgraduate',
    } as any);

    await this.serviceStudent.addList(list);
  }

  async addProgramme(count) {

    const list = [...Array(count).keys()].map(i => {
      const o = new Programme();
      o.title = faker.name.title();
      o.date = faker.date.recent();
      return o;
    });

    await this.serviceProgramme.addList(list);
  }

  async addStudentProgramme(count) {

    const list = [...Array(count).keys()].map(i => {
      const o = new StudentProgramme();
      o.studentId = i + 1;
      o.programmeId = i + 1;
      o.date = faker.date.future();
      return o;
    });

    await this.serviceStudentProgramme.addList(list);
  }

  async addCourse(count) {

    const list = [...Array(count).keys()].map(i => {
      const o = new Course();
      o.title = 'Course 101';
      o.description = '';
      o.courseCode = '';
      o.prerequisites = [''];
      o.restrictions = [''];
      o.semester = {
        first: true,
        second: false,
      };
      o.valueArea = {
        one: true,
        two: true,
        three: true,
        four: false,
      };
      return o;
    });

    await this.serviceCourse.addList(list);
  }

  async addCourseCode(count) {

    const list = [...Array(count).keys()].map(i => {
      const o = new CourseCode();
      o.title = faker.name.title();
      o.code = faker.random.number();
      o.courseId = i + 1;
      o.date = faker.date.future();
      return o;
    });

    await this.serviceCourseCode.addList(list);
  }
}