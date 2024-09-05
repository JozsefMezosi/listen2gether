import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { DEFAULT_PAGE_SIZE, VALID_PAGE_SIZES } from './constants';

@Injectable()
export class ParseLimitPipe implements PipeTransform<string, number> {
    transform(value?: string): number {
        const limit = value ? parseInt(value) : DEFAULT_PAGE_SIZE;
        if (isNaN(limit))
            throw new BadRequestException('Limit must be a nubmer.');

        if (
            !VALID_PAGE_SIZES.includes(
                limit as (typeof VALID_PAGE_SIZES)[number],
            )
        )
            throw new BadRequestException(
                `Limit must be one of these value: ${VALID_PAGE_SIZES.join(
                    ', ',
                )}`,
            );

        return limit;
    }
}
