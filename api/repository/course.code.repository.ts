import { AllRepository } from './all.repository';
import { CourseCode } from '../model/models';

export class CourseCodeRepository extends AllRepository<CourseCode> {

  constructor() {
    super(CourseCode);
  }
}
