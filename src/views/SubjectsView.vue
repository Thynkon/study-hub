<script setup lang="ts">
import SuccessAlert from '@/components/SuccessAlert.vue';
import Edit from '@/components/subjects/Edit.vue';
import New from '@/components/subjects/New.vue';
import { db } from '@/firebase';
import { useSubjectsStore } from '@/stores/subjects';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue';
import { ChevronUpIcon, PencilIcon, TrashIcon } from '@heroicons/vue/20/solid';
import { collection } from 'firebase/firestore';
import { ref } from 'vue';
import { useCollection } from 'vuefire';

type Author = {
  name: string;
  email: string;
}

type Subject = {
  name: string;
  description: string;
  author: Author;
}

function closeCreateForm() {
  isCreateForm.value = false;
}

function closeEditForm() {
  isEditForm.value = false;
}

const subjectsStore = useSubjectsStore();

const handleCreate = () => {
  isCreateForm.value = true;
};

const handleEdit = (item) => {
  console.log("Setting subject to ==> ");
  console.log(item);
  subject.value = item;
  isEditForm.value = true;
  //openModal();
};

const handleDelete = (subject) => {
  // Delete subject from subjects collection
  subjectsStore.deleteSubject(subject);
};

const subjects = useCollection(collection(db, 'subjects'));
const subject = ref({} as Subject);

const isCreateForm = ref(false);
const isEditForm = ref(false);
</script>

<template>
  <div class="w-full pt-16">
    <div class="mx-auto w-full rounded-2xl bg-white space-y-4">

      <SuccessAlert position="top right" group="subjects" />

      <div class="flex justify-end">
        <button class="primary-button" @click.prevent="handleCreate">
          Add Subject
        </button>

        <New :isOpen="isCreateForm" :closeModal="closeCreateForm" />
      </div>

      <Disclosure v-slot="{ open }" v-for="subject in subjects" :key="subject.id">
        <DisclosureButton
          class="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-black-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-black-500 focus-visible:ring-opacity-75">
          <span>{{ subject.name }}</span>
          <ChevronUpIcon :class="open ? 'rotate-180 transform' : ''" class="h-5 w-5 text-gray-500" />
        </DisclosureButton>
        <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500 flex flex-col space-y-2">
          <textarea class="border border-gray-200 p-2 rounded-lg" readonly>{{ subject.description }}</textarea>
          <div class="flex justify-end space-x-2">
            <PencilIcon class="h-5 w-5 cursor-pointer" @click="handleEdit(subject)" />
            <TrashIcon class="h-5 w-5 cursor-pointer" @click="handleDelete(subject)" />
          </div>
        </DisclosurePanel>
      </Disclosure>
      <Edit :isOpen="isEditForm" :closeModal="closeEditForm" :subject="subject" :key="subject.name" />
    </div>
  </div>
</template>
