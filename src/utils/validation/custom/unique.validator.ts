import { Injectable, Inject } from "@nestjs/common";
import { MongooseCollectionOptions } from "../utils/mongooseConnection.utils"
import { ValidatorConstraintInterface, ValidationArguments, ValidatorConstraint, ValidationOptions, registerDecorator } from "class-validator";
import { ModuleRef } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";

@ValidatorConstraint({ async: true, name: 'isUnique' })
@Injectable()
export class UniqueValidator implements ValidatorConstraintInterface {
    constructor(private readonly moduleRef: ModuleRef) {
        // console.log(moduleRef)
    }

    async validate(value: string | number, args: ValidationArguments): Promise<boolean> {
        console.log(this.conneccion());
        return true;
        // field
        // return !!await mongoose.connection.db.collection('name').findOne({});
    }

    conneccion(name: string = 'default') {
        this.moduleRef;
    }
}

export function IsUnique(constraint?: MongooseCollectionOptions, validationOptions?: ValidationOptions) {
    return function(target: any, propertyName: string) {
        registerDecorator({
            target: target.constructor,
            propertyName,
            options: validationOptions,
            constraints: [constraint],
            validator: UniqueValidator,
        });
    }
}
