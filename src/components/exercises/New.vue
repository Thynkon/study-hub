<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { reactive } from 'vue';
import ErrorAlert from '../ErrorAlert.vue';
import { useSubjectsStore } from '@/stores/subjects';

const props = defineProps<{
  isOpen: boolean;
  closeModal: () => void;
}>();

const subjectsStore = useSubjectsStore();

const onSubmit = async () => {
  const result = await v$.value.$validate();
  if (!result) {
    console.log('Validation failed');
    return;
  }

  await subjectsStore.createSubject({
    name: formData.name,
    slug: formData.slug,
    description: formData.description,
  });

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
  <div class="fixed inset-0 overflow-y-auto">
    <div class="flex min-h-full items-center justify-center p-4 text-center">
      <div class="mt-2">
        <form @submit.prevent="onSubmit">
          <div class="space-y-6 bg-white py-5">
            <!-- Name -->
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

            <!-- Slug -->
            <div>
              <ErrorAlert :errors="v$.slug.$errors" />
              <div>
                <label
                  for="slug"
                  class="block text-sm font-medium text-gray-700"
                  >Slug</label
                >
                <div class="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    id="slug"
                    class="w-full rounded-md ring-2 ring-gray-100 focus:ring-gray-200 sm:text-sm p-2"
                    v-model="formData.slug"
                  />
                </div>
              </div>
            </div>

            <!-- Description -->
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
    </div>
  </div>
</template>
