import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @ApiOperation({ summary: 'Create Feedback' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Property Not Found.' })
  @ApiResponse({ status: 409, description: 'Feedback already exists' })
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedbackDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Feedback' })
  @ApiResponse({status: 200, description: 'The record has been successfully retrieved.'})
  findAll() {
    return this.feedbackService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Feedback By Id' })
  @ApiResponse({status: 200, description: 'The record has been successfully retrieved.'})
  @ApiResponse({status: 404, description: 'Feedback Not Found.'})
  findOne(@Param('id') id: string) {
    return this.feedbackService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Feedback' })
  @ApiResponse({status: 200, description: 'The record has been successfully updated.'})
  @ApiResponse({status: 404, description: 'Feedback Not Found.'})
  update(
    @Param('id') id: string,
    @Body() updateFeedbackDto: UpdateFeedbackDto,
  ) {
    return this.feedbackService.update(id, updateFeedbackDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Feedback' })
  @ApiResponse({status: 200, description: 'The record has been successfully deleted.'})
  @ApiResponse({status: 404, description: 'Feedback Not Found.'})
  remove(@Param('id') id: string) {
    return this.feedbackService.remove(id);
  }
}
