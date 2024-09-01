import { Inject, Injectable } from '@nestjs/common';
import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from '../user.repository';
import { MapKeysToSelf } from 'src/common/model/map-keys-to-self';

export const ThrowErrorIfUser = {
    Exists: 'Exists',
    NotExists: 'NotExists',
} as const;
type ThrowErrorIfUser = keyof typeof ThrowErrorIfUser;

type UserExistsBasedOn = 'email' | 'id';

export const UserExistsBasedOn: MapKeysToSelf<UserExistsBasedOn> = {
    email: 'email',
    id: 'id',
} as const;

const ERROR_MESSAGE_MAP: Record<
    UserExistsBasedOn,
    Record<ThrowErrorIfUser, string>
> = {
    [UserExistsBasedOn.email]: {
        [ThrowErrorIfUser.Exists]: 'User with email: $value is already exists.',
        [ThrowErrorIfUser.NotExists]: 'User with email: $value is not exists.',
    },
    [UserExistsBasedOn.id]: {
        [ThrowErrorIfUser.Exists]: 'User with id: $value is already exists.',
        [ThrowErrorIfUser.NotExists]: 'User with id: $value is not exists.',
    },
};

@Injectable()
@ValidatorConstraint({ name: 'isUserExists', async: true })
export class IsUserExistsConstraint implements ValidatorConstraintInterface {
    @Inject(UserRepository)
    private readonly userRepository: UserRepository;

    async validate(value: string, args: ValidationArguments) {
        const [throwErrorIf, basedOn] = args.constraints as [
            ThrowErrorIfUser,
            UserExistsBasedOn,
        ];

        const params = basedOn === 'email' ? { email: value } : { id: +value };

        const userExist = await this.userRepository.exists(params);

        return throwErrorIf === ThrowErrorIfUser.Exists
            ? !userExist
            : userExist;
    }

    defaultMessage(args: ValidationArguments): string {
        const [throwErrorIf, basedOn] = args.constraints as [
            ThrowErrorIfUser,
            UserExistsBasedOn,
        ];
        return ERROR_MESSAGE_MAP[basedOn][throwErrorIf];
    }
}

export function IsUserExists(
    {
        throwErrorIfUser,
        basedOn = 'email',
    }: { throwErrorIfUser: ThrowErrorIfUser; basedOn?: UserExistsBasedOn },
    options: ValidationOptions = {},
) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options,
            constraints: [throwErrorIfUser, basedOn],
            validator: IsUserExistsConstraint,
        });
    };
}
