import { iterate } from "iterare";
import { ValidationError } from "class-validator";
import { UnprocessableEntityException } from "@nestjs/common";

function prependConstraintsWithParentProp(
    parentError: ValidationError,
    error: ValidationError,
): ValidationError {
    error.property = `${parentError.property}.${error.property}`;
    // console.log(error, parentError.property);
    return error;
}

function mapChildrenToValidationErrors(
    error: ValidationError,
): ValidationError[] {
    if (!(error.children && error.children.length)) {
        return [error];
    }
    const validationErrors = [];
    for (const item of error.children) {
        if (item.children && item.children.length) {
            item.property = `${error.property}.${item.property}`;
            validationErrors.push(...mapChildrenToValidationErrors(item));
        }
        validationErrors.push(prependConstraintsWithParentProp(error, item));
    }
    return validationErrors;
}

function flattenValidationError(validationErrors: ValidationError[]) {
    return iterate(validationErrors)
        .map(error => mapChildrenToValidationErrors(error))
        .flatten()
        .filter(item => !!item.constraints)
        .map(item => ({ [item.property]: Object.values(item.constraints) }))
        .toArray();
}

export function exceptionFactory(validationErrors: ValidationError[]) {
    return new UnprocessableEntityException(
        flattenValidationError(validationErrors)
    );
};
