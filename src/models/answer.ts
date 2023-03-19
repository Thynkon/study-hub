export default class Answer {
  private _id: string;

  public value: string;
  public is_correct: boolean;
  public selected: boolean = false;

  constructor(id: string, value: string, is_correct: boolean) {
    this._id = id;

    this.value = value;
    this.is_correct = is_correct;
  }

  public get id(): string {
    return this._id;
  }
}
