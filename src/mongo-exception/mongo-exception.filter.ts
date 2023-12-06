import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    // switch (exception.code) {
    //   case 11000:
    //   default: console.log(exception,'ALERT ERROR CATCHED');
    //     // duplicate exception
    //     // do whatever you want here, for instance send error to client

    //     /** MAIGOD */
    // }
    const ctx = host.switchToHttp(),
      response = ctx.getResponse();

    return response.status(400).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: exception.message,
      //errors: exception,
    });
  }
}
