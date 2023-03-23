<script setup lang="ts">
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

import SubjectsProvider from '@/providers/subjects';

import ErrorAlert from '@/components/ErrorAlert.vue';

const props = defineProps<{
  subject: any;
  isOpen: boolean;
  closeModal: () => void;
}>();

const onSubmit = async () => {
  const result = await v$.value.$validate();
  if (!result) {
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
              <DialogTitle as="h3">Edit</DialogTitle>

              <form @submit.prevent="onSubmit">
                <div class="py-5 space-y-6 bg-white">
                  <!-- Name -->
                  <div class="space-y-2">
                    <ErrorAlert :errors="v$.name.$errors" />

                    <label for="name" class="font-medium text-gray-700">
                      Name
                    </label>
                    <input type="text" id="name" v-model="formData.name" />
                  </div>

                  <!-- Description -->
                  <div class="space-y-2">
                    <ErrorAlert :errors="v$.description.$errors" />

                    <label for="description" class="font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows="3"
                      v-model="formData.description"
                    ></textarea>
                  </div>
                </div>

                <!-- Buttons -->
                <div class="flex justify-end">
                  <button type="submit" class="btn-primary">Save</button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
