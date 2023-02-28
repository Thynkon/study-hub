<script setup lang="ts">
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue';
import { ChevronUpIcon, PencilIcon, TrashIcon } from '@heroicons/vue/20/solid';
import { useCollection } from 'vuefire';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';
import { onMounted, onUpdated, ref } from 'vue';
import Edit from '@/components/subjects/Edit.vue';
import { useSubjectsStore } from '@/stores/subjects';
import SuccessAlert from '@/components/SuccessAlert.vue';

const isOpen = ref(false);

function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}

type Author = {
  name: string;
  email: string;
}

type Subject = {
  name: string;
  description: string;
  author: Author;
}

const subjectsStore = useSubjectsStore();

const handleEdit = (item) => {
  console.log("Setting subject to ==> ");
  console.log(item);
  subject.value = item;
  openModal();
};

const handleDelete = (subject) => {
  // Delete subject from subjects collection
  subjectsStore.deleteSubject(subject);
};

const subjects = useCollection(collection(db, 'subjects'));
const subject = ref({} as Subject);

onMounted(async () => {
  subjects.value.forEach((subject) => {
    console.log("Subject from firebase ==> ");
    console.log(subject);
  });
});

</script>

<template>
  <div class="w-full pt-16">
    <div class="mx-auto w-full rounded-2xl bg-white space-y-4">

      <SuccessAlert position="top right" group="subjects" />

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
      <Edit :isOpen="isOpen" :closeModal="closeModal" :subject="subject" :key="subject.name" />
    </div>
  </div>
</template>
