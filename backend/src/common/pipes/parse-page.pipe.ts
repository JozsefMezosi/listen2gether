import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { DEFAULT_PAGE } from './constants';

@Injectable()
export class ParsePagePipe implements PipeTransform<string, number> {
    transform(value?: string): number {
        const page = value ? parseInt(value) : DEFAULT_PAGE;
        if (isNaN(page))
            throw new BadRequestException('Page must be a number.');

        if (page < 1)
            throw new BadRequestException(
                'Page parameter must be bigger than 0.',
            );

        return page;
    }
}
