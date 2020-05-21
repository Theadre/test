import { AllRepository } from './all.repository';
import { StudentProgramme } from '../model/models';

export class StudentProgrammeRepository extends AllRepository<StudentProgramme> {

  constructor() {
    super(StudentProgramme);
  }
}