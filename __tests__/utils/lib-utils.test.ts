import { describe, expect, it } from 'vitest';
import { cn, isValidEmail, isValidPassword } from '@/lib/utils';

describe('lib/utils', () => {
  describe('isValidEmail', () => {
    it('returns true for valid email addresses', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('first.last@school.edu')).toBe(true);
    });

    it('returns false for invalid email addresses', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('missing-at.com')).toBe(false);
      expect(isValidEmail('missing-domain@')).toBe(false);
    });
  });

  describe('isValidPassword', () => {
    it('returns true when password length is at least 8', () => {
      expect(isValidPassword('12345678')).toBe(true);
      expect(isValidPassword('longer-password')).toBe(true);
    });

    it('returns false when password length is less than 8', () => {
      expect(isValidPassword('1234567')).toBe(false);
      expect(isValidPassword('')).toBe(false);
    });
  });

  describe('cn', () => {
    it('joins truthy class values and removes falsy values', () => {
      expect(cn('base', undefined, false, 'active')).toBe('base active');
      expect(cn(undefined, false, 'single')).toBe('single');
    });
  });
});