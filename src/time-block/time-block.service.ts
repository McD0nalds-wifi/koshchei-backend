import { Injectable } from '@nestjs/common'

import { TimeBlockDto } from './dto/time-block.dto'
import { PrismaService } from '../prisma.service'

@Injectable()
export class TimeBlockService {
    constructor(private prisma: PrismaService) {}

    async getAll(userId: string) {
        return this.prisma.timeBlock.findMany({
            orderBy: {
                order: 'asc',
            },
            where: {
                userId,
            },
        })
    }

    async create(dto: TimeBlockDto, userId: string) {
        return this.prisma.timeBlock.create({
            data: {
                ...dto,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        })
    }

    async update(dto: Partial<TimeBlockDto>, timeBlockId: string, userId: string) {
        return this.prisma.timeBlock.update({
            data: dto,
            where: {
                id: timeBlockId,
                userId,
            },
        })
    }

    async delete(timeBlockId: string, userId: string) {
        return this.prisma.timeBlock.delete({
            where: {
                id: timeBlockId,
                userId,
            },
        })
    }

    async updateOrder(ids: Array<string>) {
        return this.prisma.$transaction(
            ids.map((id, order) =>
                this.prisma.timeBlock.update({
                    data: { order },
                    where: { id },
                }),
            ),
        )
    }
}
