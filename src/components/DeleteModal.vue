<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';

const props = defineProps<{
  isOpen: boolean;
  closeModal: () => void;
  onConfirm: () => void;
}>();
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
                >Are you sure?</DialogTitle
              >

              <div class="flex space-x-4 mt-4 justify-end">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  @click="onConfirm"
                >
                  Yes
                </button>
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-sm font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  No
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
