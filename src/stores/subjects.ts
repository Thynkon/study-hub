import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire';
import { db } from '@/firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification()

const auth = useFirebaseAuth();

export type Message = {
  $message: string;
  type: number;
};

export const useSubjectsStore = defineStore('subjects', () => {
  async function updateSubject(subject, data) {
    // Update subject in subjects collection
    updateDoc(doc(db, 'subjects', subject.id), {
      name: data.name,
      description: data.description,
    });

    notify({
      type: "success",
      group: "subjects",
      title: "Subject updated successfully",
    });
  }

  function deleteSubject(subject: any) {
    // Delete subject
    deleteDoc(doc(db, 'subjects', subject.id));
    notify({
      type: "success",
      group: "subjects",
      title: "Subject deleted successfully",
    });
  }

  return { updateSubject, deleteSubject };
});