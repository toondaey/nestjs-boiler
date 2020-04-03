import { isEmail, matches } from "validator";
import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

/**
 * Custom validator
 * @param {ValidationOptions} validationOptions Validation Options
 * @returns {function}
 */
export function IsUsername(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isUsername',
            target: object.constructor,
            propertyName: propertyName,
            // constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return isEmail(value) || matches(value, /^\+\d+/);
                }
            }
        });
    };
}
