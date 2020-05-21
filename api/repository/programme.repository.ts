import { Programme } from '../model/models';
import { AllRepository } from './all.repository';

export class ProgrammeRepository extends AllRepository<Programme> {

  constructor() {
    super(Programme);
  }
}
