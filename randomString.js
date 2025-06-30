/**
 * Generates a random string of a specified length.
 * Can include letters (uppercase/lowercase), numbers, and/or special characters.
 *
 * @param {number} length The desired length of the random string.
 * @param {object} options Optional settings for character types.
 * @param {boolean} [options.includeLetters=true] Whether to include letters (a-z, A-Z).
 * @param {boolean} [options.includeNumbers=true] Whether to include numbers (0-9).
 * @param {boolean} [options.includeSpecialChars=false] Whether to include common special characters (!@#$%^&*).
 * @returns {string} The randomly generated string.
 */

//นำไปใช้ในไฟล์ js อื่น
// export default function () {
//     // สุ่มสตริงความยาว 16 ตัวอักษร มีทั้งตัวอักษรและตัวเลข
//     const randomId = generateRandomString(16, { includeSpecialChars: false });
//     // สุ่มสตริงความยาว 8 ตัวอักษร มีแค่ตัวเลขเท่านั้น
//     const randomPIN = generateRandomString(8, { includeLetters: false, includeSpecialChars: false });
//     // สุ่มสตริงความยาว 20 ตัวอักษร มีทั้งตัวอักษร ตัวเลข และอักขระพิเศษ
//     const randomSecret = generateRandomString(20, { includeSpecialChars: true });
// }

export function generateRandomString(length, options = {}) {
    const defaultOptions = {
        includeLetters: true,
        includeNumbers: true,
        includeSpecialChars: false,
    };
    const settings = { ...defaultOptions, ...options };

    let characters = '';
    if (settings.includeLetters) {
        characters += 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (settings.includeNumbers) {
        characters += '0123456789';
    }
    if (settings.includeSpecialChars) {
        characters += '!@#$%^&*'; // Add more special characters if needed
    }

    if (characters.length === 0) {
        throw new Error('At least one character type (letters, numbers, special chars) must be enabled.');
    }

    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}