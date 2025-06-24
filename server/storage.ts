import { users, userPreferences, bookmarks, type User, type InsertUser, type UserPreferences, type InsertUserPreferences, type Bookmark, type InsertBookmark } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUserPreferences(userId: number): Promise<UserPreferences | undefined>;
  updateUserPreferences(userId: number, preferences: Partial<InsertUserPreferences>): Promise<UserPreferences>;
  getUserBookmarks(userId: number): Promise<Bookmark[]>;
  createBookmark(bookmark: InsertBookmark): Promise<Bookmark>;
  deleteBookmark(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private userPreferences: Map<number, UserPreferences>;
  private bookmarks: Map<number, Bookmark>;
  private currentUserId: number;
  private currentPreferencesId: number;
  private currentBookmarkId: number;

  constructor() {
    this.users = new Map();
    this.userPreferences = new Map();
    this.bookmarks = new Map();
    this.currentUserId = 1;
    this.currentPreferencesId = 1;
    this.currentBookmarkId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getUserPreferences(userId: number): Promise<UserPreferences | undefined> {
    return Array.from(this.userPreferences.values()).find(
      (pref) => pref.userId === userId,
    );
  }

  async updateUserPreferences(userId: number, preferences: Partial<InsertUserPreferences>): Promise<UserPreferences> {
    const existing = await this.getUserPreferences(userId);
    
    if (existing) {
      const updated = { ...existing, ...preferences };
      this.userPreferences.set(existing.id, updated);
      return updated;
    } else {
      const id = this.currentPreferencesId++;
      const newPrefs: UserPreferences = {
        id,
        userId,
        location: null,
        selectedReciter: "mishary",
        notificationsEnabled: false,
        prayerTimes: null,
        lastBookmark: null,
        createdAt: new Date(),
        ...preferences,
      };
      this.userPreferences.set(id, newPrefs);
      return newPrefs;
    }
  }

  async getUserBookmarks(userId: number): Promise<Bookmark[]> {
    return Array.from(this.bookmarks.values()).filter(
      (bookmark) => bookmark.userId === userId,
    );
  }

  async createBookmark(insertBookmark: InsertBookmark): Promise<Bookmark> {
    const id = this.currentBookmarkId++;
    const bookmark: Bookmark = {
      ...insertBookmark,
      id,
      createdAt: new Date(),
    };
    this.bookmarks.set(id, bookmark);
    return bookmark;
  }

  async deleteBookmark(id: number): Promise<void> {
    this.bookmarks.delete(id);
  }
}

export const storage = new MemStorage();
