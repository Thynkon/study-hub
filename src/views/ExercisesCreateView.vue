<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import Question from '@/models/question';
import Answer from '@/models/answer';
import Exercise from '@/models/exercise';
import { useCurrentUser } from 'vuefire';
import User from '@/models/user';
import type Subject from '@/models/subject';
import ExercisesProvider from '@/providers/exercises';
import ErrorAlert from '@/components/ErrorAlert.vue';
import router from '@/router';
import { useSubjectsStore } from '@/stores/subjects';
import { useRoute } from 'vue-router';
import { TrashIcon } from '@heroicons/vue/20/solid';

const user = useCurrentUser();

const formData = reactive({
  title: '',
  theory: '',
});

const rules = {
  title: {},
  theory: {},
};

const route = useRoute();

const subjectId = route.params.id as string;
const subjectsStore = useSubjectsStore();

const u = new User('', '', '');

const questions = ref<Question[]>([
  new Question('', '', [new Answer('', '', false)]),
]);

const exercise = ref<Exercise>(
  new Exercise('', u, '', '', questions.value as Question[], [])
);

const handleAddAnswer = (question: Question) => {
  question.answers.push(new Answer('', '', false));
};

const handleRemoveAnswer = (question: Question, answer: Answer) => {
  question.answers = question.answers.filter((a) => a !== answer);
};

const handleAddQuestion = () => {
  questions.value.push(new Question('', '', [new Answer('', '', false)]));
};

const handleRemoveQuestion = (question: Question) => {
  questions.value = questions.value.filter((q) => q !== question);
};

const onSubmit = async () => {
  const result = await v$.value.$validate();
  if (!result) {
    //console.log('Validation failed');
    //return;
  }

  ExercisesProvider.create(exercise.value as Exercise);
  // Redirect to /subjects:id
  router.push(`/subjects/${subjectId}`);
  router.push({ name: 'subject', params: { id: subjectId } });
};

const v$ = useVuelidate(rules, formData);

onMounted(async () => {
  const subject = await subjectsStore.getSubject(subjectId);
  exercise.value.subjects = [subject.ref];
});
</script>

<template>
  <div class="w-full pt-16">
    <h2 class="text-xl font-bold">Add a new exercise</h2>
    <div class="mt-2 shadow-md p-4 rounded-sm border-1 border-gray-200">
      <form @submit.prevent="onSubmit">
        <div class="space-y-6 bg-white py-5">
          <div>
            <ErrorAlert :errors="v$.title.$errors" />
            <div>
              <label for="title" class="block text-sm font-medium text-gray-700"
                >Name</label
              >
              <div class="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  id="title"
                  class="w-full rounded-md ring-2 ring-gray-100 focus:ring-gray-200 sm:text-sm p-2"
                  v-model="exercise.title"
                />
              </div>
            </div>
          </div>

          <div>
            <div>
              <label
                for="description"
                class="block text-sm font-medium text-gray-700"
                >Theory</label
              >
              <div class="mt-1">
                <textarea
                  id="description"
                  rows="3"
                  v-model="exercise.theory"
                  class="mt-1 w-full rounded-md ring-2 ring-gray-100 focus:ring-gray-200 shadow-sm focus:border-gray-500 sm:text-sm p-2"
                ></textarea>
              </div>
            </div>
            <div class="mt-4">
              <ErrorAlert :errors="v$.theory.$errors" />
            </div>
          </div>
          <div class="flex flex-col space-y-4 border-2 rounded-md">
            <div class="flex justify-end items-center pl-2">
              <div class="grow">
                <label
                  for="question-{{ question.id }}"
                  class="block text-sm font-medium text-gray-700"
                  >Questions</label
                >
              </div>

              <button class="primary-button" @click.prevent="handleAddQuestion">
                New
              </button>
            </div>
            <div
              v-for="(question, questionIndex) in questions"
              class="flex flex-col space-y-4 pl-4"
            >
              <label
                :for="'question-' + questionIndex + '-caption'"
                class="block text-sm font-medium text-gray-700"
                >Caption</label
              >
              <input
                type="text"
                class="w-full rounded-md ring-2 ring-gray-100 focus:ring-gray-200 sm:text-sm p-2"
                :id="'question-' + questionIndex + '-caption'"
                v-model="question.caption"
              />
              <div class="flex flex-col space-x-2 space-y-8 w-full">
                <div class="flex justify-end items-center">
                  <div class="grow">
                    <label class="block text-sm font-medium text-gray-700"
                      >Answers</label
                    >
                  </div>

                  <button
                    class="primary-button"
                    @click.prevent="handleAddAnswer(question as Question)"
                  >
                    New
                  </button>
                </div>

                <div
                  class="flex space-y-4 space-x-4"
                  v-for="(answer, answerIndex) in question.answers"
                >
                  <div class="flex-grow">
                    <div>
                      <label
                        :for="
                          'question-' +
                          questionIndex +
                          '-answer-' +
                          answerIndex +
                          '-value'
                        "
                        :id="'question-' + question.id + '-answer-'"
                        class="block text-sm font-medium text-gray-700"
                        >Value</label
                      >
                      <input
                        type="text"
                        class="w-full rounded-md ring-2 ring-gray-100 focus:ring-gray-200 sm:text-sm p-2"
                        :id="
                          'question-' +
                          questionIndex +
                          '-answer-' +
                          answerIndex +
                          '-value'
                        "
                        v-model="answer.value"
                      />
                    </div>
                    <div class="flex space-x-4">
                      <label
                        :for="
                          'question-' +
                          questionIndex +
                          '-answer-' +
                          answerIndex +
                          '-isCorrect'
                        "
                        class="block text-sm font-medium text-gray-700"
                        >Is correct?</label
                      >
                      <input
                        type="checkbox"
                        :id="
                          'question-' +
                          questionIndex +
                          '-answer-' +
                          answerIndex +
                          '-isCorrect'
                        "
                        v-model="answer.isCorrect"
                      />
                    </div>
                  </div>
                  <div>
                    <TrashIcon
                      class="h-6 w-6 text-gray-400 hover:text-gray-500"
                      @click.prevent="handleRemoveAnswer(question, answer)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-right">
          <button
            type="submit"
            class="inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            @click.prevent="onSubmit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
