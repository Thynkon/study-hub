<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue';
import { required } from '@vuelidate/validators';
import { onMounted, reactive } from 'vue';
import ErrorAlert from '../ErrorAlert.vue';

const props = defineProps<{
  exercise: any;
  isOpen: boolean;
  closeModal: () => void;
}>();

const onSubmit = async () => {
  const result = await v$.value.$validate();
  if (!result) {
    return;
  }

  props.closeModal();
};

const formData = reactive({
  title: '',
  theory: '',
});

const rules = {
  title: { required },
  theory: {},
};

const v$ = useVuelidate(rules, formData);

onMounted(async () => {
  formData.title = props.exercise.title;
  formData.theory = props.exercise.theory;
});
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
                >Edit</DialogTitle
              >
              <div class="mt-2">
                <form @submit.prevent="onSubmit">
                  <div class="space-y-6 bg-white py-5">
                    <div>
                      <ErrorAlert :errors="v$.title.$errors" />
                      <div>
                        <label
                          for="title"
                          class="block text-sm font-medium text-gray-700"
                          >Name</label
                        >
                        <div class="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            id="title"
                            class="w-full rounded-md ring-2 ring-gray-100 focus:ring-gray-200 sm:text-sm p-2"
                            v-model="formData.title"
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
                            v-model="formData.theory"
                            class="mt-1 w-full rounded-md ring-2 ring-gray-100 focus:ring-gray-200 shadow-sm focus:border-gray-500 sm:text-sm p-2"
                          ></textarea>
                        </div>
                      </div>
                      <div class="mt-4">
                        <ErrorAlert :errors="v$.theory.$errors" />
                      </div>
                    </div>
                    <div class="flex flex-col space-y-4">
                      <div
                        v-for="question in exercise.questions"
                        :key="question.id"
                        class="flex flex-col space-y-1"
                      >
                        <label
                          for="description"
                          class="block text-sm font-medium text-gray-700"
                        >
                          {{ question.caption }}
                        </label>
                        <div
                          v-for="answer in question.answers"
                          :key="answer.id"
                          class="flex space-x-2"
                        >
                          <input
                            type="radio"
                            name="question-{{ question.id }}"
                            :value="answer.value"
                          />
                          <label for="question-{{ question.id }}">
                            {{ answer.value }}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="text-right">
                    <button
                      type="submit"
                      class="inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
