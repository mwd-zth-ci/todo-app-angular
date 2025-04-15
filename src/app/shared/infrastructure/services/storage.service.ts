import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private cache: { [key: string]: any } = {};

  getItem<T>(key: string): T | null {
    // Check cache first
    if (this.cache[key] !== undefined) {
      return this.cache[key];
    }

    // If not in cache, get from localStorage
    const item = localStorage.getItem(key);
    if (item === null) {
      return null;
    }

    try {
      const parsedItem = JSON.parse(item);
      // Cache the result
      this.cache[key] = parsedItem;
      return parsedItem;
    } catch (error) {
      console.error('Error parsing localStorage item:', error);
      return null;
    }
  }

  setItem<T>(key: string, value: T): void {
    try {
      const stringifiedValue = JSON.stringify(value);
      localStorage.setItem(key, stringifiedValue);
      // Update cache
      this.cache[key] = value;
    } catch (error) {
      console.error('Error storing item in localStorage:', error);
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
    // Remove from cache
    delete this.cache[key];
  }

  clear(): void {
    localStorage.clear();
    // Clear cache
    this.cache = {};
  }
} 