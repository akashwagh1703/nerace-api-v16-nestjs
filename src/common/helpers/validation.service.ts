import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidationService {
  
  validateMobile(mobile: string): boolean {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePincode(pincode: string): boolean {
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    return pincodeRegex.test(pincode);
  }

  validatePan(pan: string): boolean {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  }

  validateAadhar(aadhar: string): boolean {
    const aadharRegex = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
    return aadharRegex.test(aadhar);
  }

  validateGst(gst: string): boolean {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstRegex.test(gst);
  }

  validatePassword(password: string): { isValid: boolean; errors: string[] } {
    const errors = [];
    
    if (password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  validateCoordinates(lat: string, lng: string): boolean {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    
    return (
      !isNaN(latitude) && 
      !isNaN(longitude) && 
      latitude >= -90 && 
      latitude <= 90 && 
      longitude >= -180 && 
      longitude <= 180
    );
  }

  sanitizeInput(input: string): string {
    return input.trim().replace(/[<>]/g, '');
  }

  validateRequired(fields: { [key: string]: any }): { isValid: boolean; missingFields: string[] } {
    const missingFields = [];
    
    for (const [key, value] of Object.entries(fields)) {
      if (value === null || value === undefined || value === '') {
        missingFields.push(key);
      }
    }

    return {
      isValid: missingFields.length === 0,
      missingFields
    };
  }

  validateNumericRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
  }

  validateDate(dateString: string): boolean {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  }

  validateUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}
