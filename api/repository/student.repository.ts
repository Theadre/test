import { Student } from '../model/models';
import { AllRepository } from './all.repository';

export class StudentRepository extends AllRepository<Student> {

  constructor() {
    super(Student);
  }
}
