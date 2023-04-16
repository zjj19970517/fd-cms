import { Injectable, Scope } from '@nestjs/common';
import { createLogger, Logger, transports, format } from 'winston';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService {
  private context?: string;
  private logger: Logger;

  public setContext(context: string): void {
    this.context = context;
  }

  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(format.timestamp(), format.prettyPrint()),

      transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' }),
      ],
    });
  }

  /**
   * 输出 INFO 分级的日志
   * @param tag 标记
   * @param message 日志描述
   * @param meta 额外信息
   * @returns
   */
  info(tag: string, message: string, meta?: Record<string, unknown>): Logger {
    return this.logger.info({
      tag,
      message,
      contextName: this.context,
      meta,
    });
  }

  /**
   * 输出 ERROR 分级的日志
   * @param tag 标记
   * @param message 异常描述
   * @param meta 额外信息
   * @returns
   */
  error(tag: string, message: string, meta?: Record<string, unknown>): Logger {
    return this.logger.error({
      tag,
      message,
      contextName: this.context,
      meta,
    });
  }

  /**
   * 输出 WARN 分级的日志
   * @param tag 标记
   * @param message 警告描述
   * @param meta 额外信息
   * @returns
   */
  warn(tag: string, message: string, meta?: Record<string, unknown>): Logger {
    return this.logger.warn({
      tag,
      message,
      contextName: this.context,
      meta,
    });
  }

  /**
   * 输出 DEBUG 分级的日志
   * @param tag 标记
   * @param message 调试描述
   * @param meta 额外信息
   * @returns
   */
  debug(tag: string, message: string, meta?: Record<string, unknown>): Logger {
    return this.logger.debug({
      tag,
      message,
      contextName: this.context,
      meta,
    });
  }
}
