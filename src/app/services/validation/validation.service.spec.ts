import { ValidationService } from './validation.service';
import {Person} from '../../models/person';

describe('ValidationService', () => {
  let service: ValidationService;

  beforeEach(() => {
    service = new ValidationService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#validateNumberAttribute', () => {
    it('should return false du to wrong entity param', () => {
      expect(ValidationService.validateNumberAttribute(null, 'height')).toBeFalse();
    });
    it('should return false du to wrong attribute param', () => {
      expect(ValidationService.validateNumberAttribute({mass: 12} as Person, 'height')).toBeFalse();
    });
    it('should return false du to wrong attribute value', () => {
      expect(ValidationService.validateNumberAttribute({mass: null} as Person, 'mass')).toBeFalse();
      expect(ValidationService.validateNumberAttribute({mass: NaN} as Person, 'mass')).toBeFalse();
    });
    it('should return true', () => {
      expect(ValidationService.validateNumberAttribute({mass: 12} as Person, 'mass')).toBeTrue();
    });
  });
});
