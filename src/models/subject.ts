import type User from '@/models/user';
import type Exercise from './exercise';

export default class Subject {
  private _id: string;
  private _author: User;
  private _exercises: Exercise[];
  private _slug: string;

  public name: string;
  public description: string;

  constructor(
    id: string,
    author: User,
    name: string,
    slug: string,
    description: string,
    exercises: Exercise[] = []
  ) {
    this._id = id;
    this._author = author;
    this._exercises = exercises;
    this._slug = slug;

    this.name = name;
    this.description = description;
  }

  public get id(): string {
    return this._id;
  }

  public get author(): User {
    return this._author;
  }

  public get slug(): string {
    return this._slug;
  }

  public set slug(slug: string) {
    this._slug = slug;
  }

  public get exercises(): Exercise[] {
    return this._exercises;
  }

  public set exercises(exercises: Exercise[]) {
    this._exercises = exercises;
  }
}
