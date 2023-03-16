<script setup lang="ts">
import SubjectsProvider from '@/providers/subjects';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { onMounted, reactive } from 'vue';
import ErrorAlert from '../ErrorAlert.vue';

const props = defineProps<{
  subject: any;
  isOpen: boolean;
  closeModal: () => void;
}>();

const onSubmit = async (e) => {
  const result = await v$.value.$validate();
  if (!result) {
    console.log('Validation failed');
    return;
  }

  // Update subject in subjects collection
  await SubjectsProvider.update(props.subject, {
    name: formData.name,
    description: formData.description,
  });

  props.closeModal();
};

const formData = reactive({
  name: '',
  description: '',
});

const rules = {
  name: { required },
  description: {},
};

const v$ = useVuelidate(rules, formData);

onMounted(async () => {
  console.log('Current subject ==> ');
  console.log(props);
  formData.name = props.subject.name;
  formData.description = props.subject.description;
  console.log('Formdata set to ==> ');
  console.log(formData);
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
                      <ErrorAlert :errors="v$.name.$errors" />
                      <div>
                        <label
                          for="name"
                          class="block text-sm font-medium text-gray-700"
                          >Name</label
                        >
                        <div class="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            id="name"
                            class="w-full rounded-md ring-2 ring-gray-100 focus:ring-gray-200 sm:text-sm p-2"
                            v-model="formData.name"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <div>
                        <label
                          for="description"
                          class="block text-sm font-medium text-gray-700"
                          >Description</label
                        >
                        <div class="mt-1">
                          <textarea
                            id="description"
                            rows="3"
                            v-model="formData.description"
                            class="mt-1 w-full rounded-md ring-2 ring-gray-100 focus:ring-gray-200 shadow-sm focus:border-gray-500 sm:text-sm p-2"
                          ></textarea>
                        </div>
                      </div>
                      <div class="mt-4">
                        <ErrorAlert :errors="v$.description.$errors" />
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
