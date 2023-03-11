import type User from '@/models/user';
import type { DocumentData, DocumentReference } from 'firebase/firestore';
import type Question from './question';
import type Subject from './subject';

export default class Exercise {
  private _id: string;
  private _author: User;
  private _questions: Question[];
  private _subjects: Subject[];

  public title: string;
  public theory: string;

  constructor(id: string, author: User, title: string, theory: string, questions: Question[], subjects: Subject[]) {
    this._id = id;
    this._author = author;
    this._questions = questions;
    this._subjects = subjects;

    this.title = title;
    this.theory = theory;
  }

  public get id(): string {
    return this._id;
  }

  public get author(): User {
    return this._author;
  }

  public get questions(): Question[] {
    return this._questions;
  }

  public get subjects(): Subject[] {
    return this._subjects;
  }

  public set subjects(subjects: Subject[]) {
    this._subjects = subjects;
  }
}
