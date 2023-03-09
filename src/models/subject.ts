import type User from '@/models/user';

export default class Subject {
  private _id: string;
  private _author: User;

  public name: string;
  public description: string;

  constructor(id: string, author: User, name: string, description: string) {
    this._id = id;
    this._author = author;

    this.name = name;
    this.description = description;
  }

  public get id(): string {
    return this._id;
  }

  public get author(): User {
    return this._author;
  }
}
