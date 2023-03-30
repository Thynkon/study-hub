import { db } from '@/firebase';
import { useNotification } from '@kyvg/vue3-notification';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { useCurrentUser } from 'vuefire';

import ExercisesProvider from '@/providers/exercises';

import type Subject from '@/models/subject';

const { notify } = useNotification();
const user = useCurrentUser();

export default class SubjectsProvider {
  private static requireAuthentication() {
    if (!user.value) {
      notify({
        type: 'error',
        group: 'subjects',
        title: 'You must be logged in to create a subject',
      });
      return false;
    }

    return true;
  }
  public static async create(subject: Subject) {
    if (!this.requireAuthentication()) {
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
      name: subject.name,
      description: subject.description,
      slug: subject.slug,
      author: authorRef,
    });

    notify({
      type: 'success',
      group: 'subjects',
      title: 'Subject created successfully',
    });
  }

  public static async get(id: string) {
    // Get subject from subjects collection
    const subject = await getDoc(doc(db, 'subjects', id));

    return subject;
  }

  public static async update(subject: Subject, data: any) {
    if (!this.requireAuthentication()) {
      return;
    }

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

  public static async delete(subject: Subject) {
    if (!this.requireAuthentication()) {
      return;
    }

    // Delete subject exercises
    subject.exercises?.forEach(async (exercise: any) => {
      await ExercisesProvider.delete(exercise);
    });

    // Delete subject
    await deleteDoc(doc(db, 'subjects', subject.id));

    notify({
      type: 'success',
      group: 'subjects',
      title: 'Subject deleted successfully',
    });
  }
}
