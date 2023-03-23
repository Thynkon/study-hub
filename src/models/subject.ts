import type User from '@/models/user';
import type { DocumentData, DocumentReference } from 'firebase/firestore';
import type Exercise from './exercise';

export default class Subject {
  private _author: User;
  private _exercises: Exercise[];
  private _slug: string;

  public id: string;
  public ref: DocumentReference<DocumentData>;
  public name: string;
  public description: string;

  constructor(
    id: string,
    ref: any = null,
    author: User,
    name: string,
    slug: string,
    description: string,
    exercises: Exercise[] = []
  ) {
    this._author = author;
    this._exercises = exercises;
    this._slug = slug;

    this.id = id;
    this.ref = ref;
    this.name = name;
    this.description = description;
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
