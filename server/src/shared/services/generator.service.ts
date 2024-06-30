import { Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import uniqid from 'uniqid'

@Injectable()
export class GeneratorService {
  public uuid(): string {
    return uuid();
  }

  public token(): string {
    return uniqid();
  }

  public fileName(ext: string): string {
    return this.uuid() + '.' + ext;
  }
}
