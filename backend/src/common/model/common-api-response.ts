import { ApiProperty } from '@nestjs/swagger';

export class CommonApiResponse {
    @ApiProperty({
        example: 'Operation successful',
        description: 'Response message from api.',
    })
    readonly message: string;
    constructor(message: string) {
        this.message = message;
    }
}
