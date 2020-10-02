import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {
  private prefix = 'ls';

  public set(key: string, value: any): boolean {
    if (value === undefined) {
      value = null;
    } else {
      value = JSON.stringify(value);
    }

    try {
      localStorage.setItem(this.deriveKey(key), value);
    } catch (e) {
      return false;
    }
    return true;
  }

  public deriveKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  public get<T>(key: string): T {
    const item = localStorage.getItem(this.deriveKey(key));

    if (!item || item === 'null') {
      return null;
    }

    try {
      return JSON.parse(item);
    } catch (e) {
      return null;
    }
  }
}
