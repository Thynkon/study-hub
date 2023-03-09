import { defineStore } from 'pinia';
import { db } from '@/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { useNotification } from '@kyvg/vue3-notification';
import { useCurrentUser } from 'vuefire';

const { notify } = useNotification();
const user = useCurrentUser();

export type Message = {
  $message: string;
  type: number;
};

export const useSubjectsStore = defineStore('subjects', () => {
  async function createSubject(data) {
    if (!user.value) {
      console.log('You must be logged in to create a subject');

      notify({
        type: 'error',
        group: 'subjects',
        title: 'You must be logged in to create a subject',
      });
      return;
    }

    const documentName = user.value?.uid;

    // Get author reference
    // https://stackoverflow.com/a/73466093
    const documentRef = doc(collection(db, 'users'), documentName!);
    const documentSnap = await getDoc(documentRef);
    const authorRef = documentSnap.ref;

    // Create subject in subjects collection
    await addDoc(collection(db, 'subjects'), {
      name: data.name,
      description: data.description,
      slug: data.slug,
      author: authorRef,
    });

    notify({
      type: 'success',
      group: 'subjects',
      title: 'Subject created successfully',
    });
  }

  async function getSubject(id: string) {
    // Get subject from subjects collection
    const subject = await getDoc(doc(db, 'subjects', id));

    return subject;
  }

  async function updateSubject(subject, data) {
    // Update subject in subjects collection
    updateDoc(doc(db, 'subjects', subject.id), {
      name: data.name,
      description: data.description,
    });

    notify({
      type: 'success',
      group: 'subjects',
      title: 'Subject updated successfully',
    });
  }

  function deleteSubject(subject: any) {
    // Delete subject
    deleteDoc(doc(db, 'subjects', subject.id));
    notify({
      type: 'success',
      group: 'subjects',
      title: 'Subject deleted successfully',
    });
  }

  return { getSubject, createSubject, updateSubject, deleteSubject };
});
