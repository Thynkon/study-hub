import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { db } from '@/firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';

const auth = useFirebaseAuth();

export type Error = {
  $message: string;
};

export const useSubjectsStore = defineStore('subjects', () => {
  const errors = ref<Error[]>([]);
  const messages = ref<String[]>([]);

  function resetErrors() {
    errors.value = [];
  }

  function resetMessages() {
    messages.value = [];
  }

  async function updateSubject(subject, data) {
    // Update subject in subjects collection
    updateDoc(doc(db, 'subjects', subject.id), {
      name: data.name,
      description: data.description,
    });

    messages.value = ['Subject updated successfully'];
    resetErrors();
  }

  function deleteSubject(subject: any) {
    // Delete subject
    deleteDoc(doc(db, 'subjects', subject.id));
    messages.value = ['Subject deleted successfully'];
    resetErrors();
  }

  return { Error, updateSubject, deleteSubject, messages, errors };
});