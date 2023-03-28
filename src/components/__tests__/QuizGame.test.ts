import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';

import Exercise from '@/models/exercise';
import Question from '@/models/question';
import Answer from '@/models/answer';

import User from '@/models/user';
import Subject from '@/models/subject';

import QuizGame from '../quiz/QuizGame.vue';

// Mock the exercises provider
vi.mock('@/providers/exercises', () => ({
  __esModule: true,
  default: {
    answer: vi.fn(() => Promise.resolve()),
  },
}));

describe('Quiz', () => {
  const author = new User('id#1', 'name', 'email');
  const subject = new Subject(
    'id#1',
    null,
    author,
    'subject',
    'sub',
    'description'
  );
  const exercise = new Exercise('id#1', author, 'title', 'theory', [], subject);
  const questions = [
    new Question('1', 'Question 1', [new Answer('1', 'Answer 1', true)]),
    new Question('2', 'Question 2', [new Answer('2', 'Answer 2', true)]),
    new Question('3', 'Question 3', [new Answer('3', 'Answer 3', true)]),
  ];

  it('next question', async () => {
    const wrapper = mount(QuizGame, {
      props: {
        exercise: exercise,
        questions: questions,
      },
    });
    const vm = wrapper.vm as any;

    expect(vm.currentQuestion).toStrictEqual(questions[0]);

    await vm.handleNext();
    expect(vm.currentQuestion).toStrictEqual(questions[1]);
    expect(vm.showResult).toBe(false);
  });

  it('next question when last question', async () => {
    const wrapper = mount(QuizGame, {
      props: {
        exercise: exercise,
        questions: questions,
      },
    });
    const vm = wrapper.vm as any;

    expect(vm.currentQuestion).toStrictEqual(questions[0]);

    await vm.handleNext();
    await vm.handleNext();
    await vm.handleNext();

    expect(vm.currentQuestion).toStrictEqual(questions[2]);
    expect(vm.showResult).toBe(true);
  });

  it('question number is correct', async () => {
    const wrapper = mount(QuizGame, {
      props: {
        exercise: exercise,
        questions: questions,
      },
    });
    const vm = wrapper.vm as any;

    expect(vm.currentQuestion).toStrictEqual(questions[0]);
    expect(wrapper.text()).toContain('Question 1 / 3');

    await vm.handleNext();
    expect(wrapper.text()).toContain('Question 2 / 3');

    await vm.handleNext();
    expect(wrapper.text()).toContain('Question 3 / 3');
  });

  it('show question result', async () => {
    const wrapper = mount(QuizGame, {
      props: {
        exercise: exercise,
        questions: questions,
      },
    });
    const vm = wrapper.vm as any;

    expect(vm.currentQuestion).toStrictEqual(questions[0]);

    await vm.handleAnswer(questions[0].answers[0]);
    expect(vm.currentQuestion).toStrictEqual(questions[0]);
    expect(vm.showResult).toBe(false);
    expect(vm.showAnswer).toBe(true);
  });
});
