import type Answer from '@/models/answer';

export default class Question {
  private _id: string;
  private _answers: Answer[];

  public caption: string;
  public success: boolean | undefined;

  constructor(id: string, caption: string, answers: Answer[]) {
    this._id = id;
    this._answers = answers;
    this.caption = caption;
  }

  public get id(): string {
    return this._id;
  }

  public get answers(): Answer[] {
    return this._answers;
  }

  public set answers(answers: Answer[]) {
    this._answers = answers;
  }

  public get correctAnswer(): Answer | undefined {
    return this._answers.find((answer) => answer.is_correct);
  }
}
