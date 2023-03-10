export default class Answer {
  private _id: string;

  public value: string;
  public isCorrect: boolean;

  constructor(id: string, value: string, is_correct: boolean = false) {
    this._id = id;
    this.isCorrect = is_correct;
    this.value = value;
  }

  public get id(): string {
    return this._id;
  }
}
