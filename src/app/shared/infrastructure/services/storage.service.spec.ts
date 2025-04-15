import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  let localStorageMock: { [key: string]: string };

  beforeEach(() => {
    localStorageMock = {};
    const localStorage = {
      getItem: (key: string) => localStorageMock[key] || null,
      setItem: (key: string, value: string) => {
        localStorageMock[key] = value;
      },
      removeItem: (key: string) => {
        delete localStorageMock[key];
      },
      clear: () => {
        localStorageMock = {};
      }
    };

    Object.defineProperty(window, 'localStorage', {
      value: localStorage,
      writable: true
    });

    TestBed.configureTestingModule({
      providers: [StorageService]
    });

    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getItem', () => {
    it('should return parsed item from localStorage', () => {
      const item = { test: 'value' };
      localStorageMock['test'] = JSON.stringify(item);

      const result = service.getItem('test');
      expect(result).toEqual(item);
    });

    it('should return null if item does not exist', () => {
      const result = service.getItem('non-existent');
      expect(result).toBeNull();
    });
  });

  describe('setItem', () => {
    it('should store stringified item in localStorage', () => {
      const item = { test: 'value' };
      service.setItem('test', item);

      expect(localStorageMock['test']).toBe(JSON.stringify(item));
    });
  });

  describe('removeItem', () => {
    it('should remove item from localStorage', () => {
      localStorageMock['test'] = 'value';
      service.removeItem('test');

      expect(localStorageMock['test']).toBeUndefined();
    });
  });

  describe('clear', () => {
    it('should clear all items from localStorage', () => {
      localStorageMock['test1'] = 'value1';
      localStorageMock['test2'] = 'value2';
      service.clear();

      expect(localStorageMock).toEqual({});
    });
  });
}); 