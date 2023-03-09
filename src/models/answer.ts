export default class Answer {
  private _id: string;
  private _is_correct: boolean;

  public value: string;

  constructor(id: string, value: string, is_correct: boolean) {
    this._id = id;
    this._is_correct = is_correct;
    this.value = value;
  }

  public get id(): string {
    return this._id;
  }

  public get isCorrect(): boolean {
    return this._is_correct;
  }
}
