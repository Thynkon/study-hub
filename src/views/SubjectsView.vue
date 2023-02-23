<script setup lang="ts">
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue'
import { ChevronUpIcon, PencilIcon, TrashIcon } from '@heroicons/vue/20/solid';
import { useCollection } from 'vuefire';
import { collection } from 'firebase/firestore';
import { db } from '@/firebase';

const handleEdit = () => {
};

const handleDelete = () => {
};

const subjects = useCollection(collection(db, 'subjects'))
</script>

<template>
  <div class="w-full pt-16">
    <div class="mx-auto w-full rounded-2xl bg-white space-y-4">
      <Disclosure v-slot="{ open }" v-for="subject in subjects" :key="subject.id">
        <DisclosureButton
          class="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-black-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-black-500 focus-visible:ring-opacity-75">
          <span>{{ subject.name }}</span>
          <ChevronUpIcon :class="open ? 'rotate-180 transform' : ''" class="h-5 w-5 text-gray-500" />
        </DisclosureButton>
        <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500 flex flex-col space-y-2">
          <div class="border border-gray-200 p-2 rounded-lg">
            {{ subject.description }}
          </div>
          <div class="flex justify-end space-x-2">
            <PencilIcon class="h-5 w-5 cursor-pointer" @click="handleEdit" />
            <TrashIcon class="h-5 w-5 cursor-pointer" @click="handleDelete" />
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  </div>
</template>
