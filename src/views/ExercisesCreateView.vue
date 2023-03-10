<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import Question from '@/models/question';
import Answer from '@/models/answer';
import Exercise from '@/models/exercise';
import User from '@/models/user';
import ExercisesProvider from '@/providers/exercises';
import ErrorAlert from '@/components/ErrorAlert.vue';
import router from '@/router';
import { useSubjectsStore } from '@/stores/subjects';
import { useRoute } from 'vue-router';
import { PlusIcon, TrashIcon } from '@heroicons/vue/20/solid';

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
  <div class="py-16 space-y-8">
    <h2 class="text-4xl font-bold">New exercise</h2>

    <form @submit.prevent="onSubmit" class="space-y-12">
      <!-- Exercise Section -->
      <div class="p-8 space-y-8 bg-white rounded-lg shadow-lg shadow-gray-300">
        <h3 class="text-2xl font-bold">Exercise</h3>

        <!-- Name -->
        <div class="space-y-4">
          <ErrorAlert :errors="v$.title.$errors" />

          <label for="title" class="text-lg font-medium text-gray-700">
            Name
          </label>
          <input type="text" id="title" class="" v-model="exercise.title" />
        </div>

        <!-- Theory -->
        <div class="space-y-4">
          <ErrorAlert :errors="v$.theory.$errors" />

          <label for="description" class="text-lg font-medium text-gray-700">
            Theory
          </label>
          <textarea id="description" rows="3" v-model="exercise.theory" />
        </div>
      </div>

      <!-- Question Section -->
      <div class="space-y-8">
        <!-- Action bar -->
        <div class="flex justify-end items-center">
          <div class="grow">
            <h3 class="text-2xl font-bold">
              Questions ({{ questions.length }})
            </h3>
          </div>

          <button @click.prevent="handleAddQuestion" class="btn-primary">
            Add question
          </button>
        </div>

        <!-- Question List -->
        <div
          v-for="(question, questionIndex) in questions"
          :key="question.id"
          class="p-8 flex flex-col space-y-8 bg-white rounded-lg shadow-lg shadow-gray-300"
        >
          <!-- Question -->
          <div class="flex gap-4">
            <div class="grow">
              <h3 class="text-2xl font-bold">
                Question {{ questionIndex + 1 }}
              </h3>
            </div>

            <TrashIcon
              @click.prevent="handleRemoveQuestion(question as Question)"
              class="btn-icon"
            />
          </div>

          <div class="space-y-4">
            <label
              :for="`question-${questionIndex}-caption`"
              class="text-lg font-medium text-gray-700"
            >
              Caption
            </label>
            <input
              type="text"
              v-model="question.caption"
              :id="`question-${questionIndex}-caption`"
            />
          </div>

          <!-- Answers -->
          <div class="space-y-8">
            <!-- Action bar -->
            <div class="flex justify-end items-center">
              <div class="grow">
                <h4 class="text-2xl font-bold">
                  Answers ({{ question.answers.length }})
                </h4>
              </div>

              <PlusIcon
                @click.prevent="handleAddAnswer(question as Question)"
                class="btn-icon"
              />
            </div>

            <!-- Answer List -->
            <div
              v-for="(answer, answerIndex) in question.answers"
              :key="answer.id"
            >
              <!-- Answer -->
              <div class="space-y-4">
                <div class="flex items-center space-x-2">
                  <label
                    :for="`question-${questionIndex}-answer-${answerIndex}-value`"
                    class="self-end grow text-lg font-medium text-gray-700"
                  >
                    Answer {{ answerIndex + 1 }}
                  </label>
                  <button
                    type="button"
                    @click="answer.isCorrect = !answer.isCorrect"
                    class="py-2 w-20 font-semibold rounded-md"
                    :class="{
                      'text-green-400 hover:text-green-500 bg-green-100 hover:bg-green-200':
                        answer.isCorrect,
                      'text-red-400 hover:text-red-500 bg-red-100 hover:bg-red-200':
                        !answer.isCorrect,
                    }"
                  >
                    {{ answer.isCorrect ? 'Valid' : 'Invalid' }}
                  </button>
                  <TrashIcon
                    class="btn-icon"
                    @click.prevent="
                      handleRemoveAnswer(question as Question, answer as Answer)
                    "
                  />
                </div>
                <input
                  type="text"
                  v-model="answer.value"
                  :id="`question-${questionIndex}-answer-${answerIndex}-value`"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <button type="submit" @click.prevent="onSubmit" class="btn-primary">
          Create exercise
        </button>
      </div>
    </form>
  </div>
</template>
