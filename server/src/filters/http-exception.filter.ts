import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { TranslationService } from '../shared/services/translation.service';
import { Request } from 'express';
import { STATUS_CODES } from 'node:http';

@Catch(HttpException)
export class AllHttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly translationService: TranslationService) {}  
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const cookies = request.cookies
    const status = exception.getStatus();
    const exceptionRes = exception.getResponse()
    let message = typeof exceptionRes === 'string' ? exceptionRes : exceptionRes['message']
    if(message?.includes('error-i18n')){
      message = await this.translationService.translate(message, {lang: cookies?.['NEXT_LOCALE']});
    }
    const data = {
      statusCode: status,
      error: STATUS_CODES[status],
      message: message
    }

    response
      .status(status)
      .json(data);
  }
}
