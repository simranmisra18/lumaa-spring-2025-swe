import { Controller, Get, Post, Put, Delete, Body, Param, Request, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
    constructor(private readonly tasksService: TasksService) {
    }

    @Get()
    getTasks(@Request() req) {
        return this.tasksService.getTasks(req.user.userId);
    }

    @Post()
    createTask(@Request() req, @Body() body: { title: string; description: string }) {
        return this.tasksService.createTask(body.title, body.description, req.user.userId);
    }

    @Put(':id')
    updateTask(
        @Param('id') id: number,
        @Body() body: { title?: string; description?: string; isComplete?: boolean },
        @Request() req
    ) {
        return this.tasksService.updateTask(id, req.user.id, body.title, body.description, body.isComplete);
    }

    @Delete(':id')
    deleteTask(@Request() req ,@Param('id') id: number) {
        return this.tasksService.deleteTask(id, req.user.userId);
    }
}
