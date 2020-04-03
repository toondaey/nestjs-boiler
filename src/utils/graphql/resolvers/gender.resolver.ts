import { GenderEnum } from "../../enums/gender.enum";
import { Resolver, ResolveField } from "@nestjs/graphql";

@Resolver('GenderEnum')
export class GenderResolver {
    @ResolveField('MALE')
    getMale() {
        return GenderEnum.MALE;
    }

    @ResolveField('FEMALE')
    getFemale() {
        return GenderEnum.FEMALE;
    }
}
