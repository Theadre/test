import { AllRepository } from './all.repository';
import { Course } from '../model/models';

export class CourseRepository extends AllRepository<Course> {

  constructor() {
    super(Course);
  }
}
