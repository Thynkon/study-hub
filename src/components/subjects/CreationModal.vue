<script setup lang="ts">
import Subject from '@/models/subject';
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
import { reactive } from 'vue';
import { useCurrentUser } from 'vuefire';
import ErrorAlert from '../ErrorAlert.vue';

const props = defineProps<{
  isOpen: boolean;
  closeModal: () => void;
}>();

const user = useCurrentUser();

const onSubmit = async () => {
  const result = await v$.value.$validate();
  if (!result) {
    console.log('Validation failed');
    return;
  }

  await SubjectsProvider.create(
    new Subject('', user, formData.name, formData.slug, formData.description)
  );

  props.closeModal();
};

const formData = reactive({
  name: '',
  slug: '',
  description: '',
});

const rules = {
  name: { required },
  slug: { required },
  description: {},
};

const v$ = useVuelidate(rules, formData);
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
          class="p-4 flex min-h-full items-center justify-center text-center"
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
              class="p-6 w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h2"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Create a new subject
              </DialogTitle>

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

                  <!-- Slug -->
                  <div class="space-y-2">
                    <ErrorAlert :errors="v$.slug.$errors" />

                    <label for="slug" class="font-medium text-gray-700"
                      >Slug</label
                    >
                    <input type="text" id="slug" v-model="formData.slug" />
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
                    />
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
