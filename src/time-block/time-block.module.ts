import { Module } from '@nestjs/common'

import { TimeBlockController } from './time-block.controller'
import { TimeBlockService } from './time-block.service'
import { PrismaService } from '../prisma.service'

@Module({
    controllers: [TimeBlockController],
    exports: [TimeBlockService],
    providers: [TimeBlockService, PrismaService],
})
export class TimeBlockModule {}
