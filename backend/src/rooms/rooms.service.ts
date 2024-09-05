import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { CreateRoomDto, CreateRoomResponse } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomsRepository } from './rooms.repository';
import { UserId } from 'src/user/model';
import { FindAllRoomDto } from './dto/find-all-room.dto';

@Injectable()
export class RoomsService {
    constructor(private readonly roomsRepository: RoomsRepository) {}
    async create(
        createRoomDto: CreateRoomDto,
        userId: UserId,
    ): Promise<CreateRoomResponse> {
        const isRoomExistsWithName = await this.roomsRepository.isExists(
            createRoomDto.name,
        );
        if (isRoomExistsWithName)
            throw new BadRequestException(
                `Room with name: ${createRoomDto.name} already exists.`,
            );

        return this.roomsRepository.create({
            ...createRoomDto,
            owner_id: userId,
        });
    }

    findAll(findAllDto: FindAllRoomDto) {
        return this.roomsRepository.findAll(findAllDto);
    }

    findOne(id: number) {
        return this.roomsRepository.find(id);
    }

    async update(id: number, updateRoomDto: UpdateRoomDto, userId: UserId) {
        const isOwnedByUser =
            (await this.roomsRepository.find(id)).owner_id === userId;
        if (!isOwnedByUser) throw new UnauthorizedException();

        await this.roomsRepository.updateOne(id, updateRoomDto);
        return `Room with id: ${id} updated.`;
    }

    async remove(id: number, userId: UserId) {
        const isOwnedByUser =
            (await this.roomsRepository.find(id)).owner_id === userId;
        if (!isOwnedByUser) throw new UnauthorizedException();

        await this.roomsRepository.deleteOne(id);
        return `Room with id: ${id} deleted.`;
    }
}
