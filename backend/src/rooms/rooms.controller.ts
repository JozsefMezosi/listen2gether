import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto, CreateRoomResponse } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { UserIdentifier } from 'src/common/decorators/user-identifier.decorator';
import { UserId } from 'src/user/model';
import { FindAllRoomDto } from './dto/find-all-room.dto';
import { ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CommonApiResponse } from 'src/common/model/common-api-response';
import { Room } from './entity/room.entity';
import { ParsePagePipe } from 'src/common/pipes/parse-page.pipe';
import { ParseLimitPipe } from 'src/common/pipes/parse-limit.pipe';

@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) {}

    @Post()
    @ApiResponse({ status: 200, type: CreateRoomResponse })
    create(
        @Body() createRoomDto: CreateRoomDto,
        @UserIdentifier() userId: UserId,
    ) {
        return this.roomsService.create(createRoomDto, userId);
    }

    @Get()
    @ApiQuery({ type: FindAllRoomDto })
    @ApiResponse({ status: 200, type: Room, isArray: true })
    findAll(
        @Query('page', new ParsePagePipe())
        page: number,
        @Query('limit', new ParseLimitPipe())
        limit: number,
    ) {
        return this.roomsService.findAll({ page, limit });
    }

    @Get(':id')
    @ApiResponse({ status: 200, type: Room })
    @ApiParam({ name: 'id', type: Number })
    findOne(@Param('id') id: string) {
        return this.roomsService.findOne(+id);
    }

    @Patch(':id')
    @ApiResponse({ status: 200, type: CommonApiResponse })
    @ApiParam({ name: 'id', type: Number })
    async update(
        @Param('id') id: string,
        @Body() updateRoomDto: UpdateRoomDto,
        @UserIdentifier() userId: UserId,
    ) {
        return new CommonApiResponse(
            await this.roomsService.update(+id, updateRoomDto, userId),
        );
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, type: CommonApiResponse })
    async remove(@Param('id') id: string, @UserIdentifier() userId: UserId) {
        return new CommonApiResponse(
            await this.roomsService.remove(+id, userId),
        );
    }
}
