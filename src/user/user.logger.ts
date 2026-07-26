import { Injectable } from "@nestjs/common";

@Injectable()
export class LoggerService {
  log(message: String) {
    console.log('[LOG]', message)
  }
}