import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {

    /**
     * Service class responsible for common input validation tasks.
     */
    // The constructor needs no documentation if it's empty, but we include it for completeness.
    constructor() {
        // Initialization logic, if any, goes here.
    }

    /**
     * Checks if a string value is valid based on presence and minimum length.
     * * @param {string} value - The string to be validated.
     * @param {number} [minLength=3] - The minimum allowed length after trimming whitespace. Defaults to 3.
     * @returns {boolean} True if the value is not null/undefined, not empty after trimming, and meets the minimum length requirement; otherwise, false.
     */
    isTextValid(value: string, minLength: number = 3): boolean {
        return !!value && value.trim().length >= minLength;
    }

    /**
     * Validates an email address against a standard pattern.
     * * @param {string} email - The email string to be validated.
     * @returns {boolean} True if the string matches the email regular expression pattern; otherwise, false. Returns false if the email is null or undefined.
     */
    isEmailValid(email: string): boolean {
        if (!email) {
            return false;
        }
        // Standard email validation pattern: 
        // 1. Starts with letters, numbers, dots, underscores, or hyphens ([a-zA-Z0-9._-])
        // 2. Followed by a single '@'
        // 3. Followed by the domain name ([a-zA-Z0-9.-])
        // 4. Followed by a dot and a top-level domain (TLD) of 2 to 6 letters ([a-zA-Z]{2,6})
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    }
}