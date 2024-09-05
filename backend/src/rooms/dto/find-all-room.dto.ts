import { ApiProperty } from '@nestjs/swagger';

export class FindAllRoomDto {
    @ApiProperty()
    page?: number;

    @ApiProperty()
    limit?: number;
}
