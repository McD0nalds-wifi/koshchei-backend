import { Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { startOfDay, subDays } from 'date-fns'

import { UserDto } from './dto/user.dto'
import { AuthDto } from '../auth/dto/auth.dto'
import { PrismaService } from '../prisma.service'

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getById(id: string) {
        return this.prisma.user.findUnique({
            include: {
                tasks: true,
            },
            where: {
                id,
            },
        })
    }

    async getByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: {
                email,
            },
        })
    }

    async getProfile(id: string) {
        const profile = await this.getById(id)

        const totalTasks = profile.tasks.length
        const completedTasks = await this.prisma.task.count({ where: { isCompleted: true, userId: id } })

        const todayStart = startOfDay(new Date())
        const weekStart = startOfDay(subDays(new Date(), 7))

        const todayTasks = await this.prisma.task.count({
            where: { createdAt: { gte: todayStart.toISOString() }, userId: id },
        })

        const weekTasks = await this.prisma.task.count({
            where: { createdAt: { gte: weekStart.toISOString() }, userId: id },
        })

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = profile

        return {
            statistics: [
                {
                    name: 'total',
                    value: totalTasks,
                },
                {
                    name: 'completedTasks',
                    value: completedTasks,
                },
                {
                    name: 'todayTasks',
                    value: todayTasks,
                },
                {
                    name: 'weekTasks',
                    value: weekTasks,
                },
            ],
            user: rest,
        }
    }

    async create(dto: AuthDto) {
        const user = {
            email: dto.email,
            name: '',
            password: await hash(dto.password),
        }

        return this.prisma.user.create({ data: user })
    }

    async update(id: string, dto: UserDto) {
        let data = dto

        if (dto.password) {
            data = { ...dto, password: await hash(dto.password) }
        }

        return this.prisma.user.update({ data, select: { email: true, name: true }, where: { id } })
    }
}
