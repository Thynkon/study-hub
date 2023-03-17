import { db } from '@/firebase';
import { useNotification } from '@kyvg/vue3-notification';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { useCollection, useCurrentUser } from 'vuefire';

import type Exercise from '@/models/exercise';

const { notify } = useNotification();

export default class ExercisesProvider {
  public static all() {
    return useCollection(collection(db, 'exercises'));
  }

  private static async _author() {
    const user = useCurrentUser();
    const documentName = user.value?.uid;

    // Get author reference
    // https://stackoverflow.com/a/73466093
    const documentRef = doc(collection(db, 'users'), documentName!);
    const documentSnap = await getDoc(documentRef);
    const authorRef = documentSnap.ref;

    return authorRef;
  }

  public static async create(exercise: Exercise) {
    // First, create exercise's questions in firebase
    // Create subject in subjects collection
    const questionsRef = exercise.questions.map(async (question) => {
      return await addDoc(collection(db, 'questions'), {
        caption: question.caption,
        answers: question.answers.map((answer) => {
          return {
            value: answer.value,
            is_correct: answer.isCorrect,
          };
        }),
      });
    });

    await Promise.all(questionsRef).then(async (questionRefs) => {
      // Create exercise in exercises collection
      const exerciseRef = await addDoc(collection(db, 'exercises'), {
        title: exercise.title,
        theory: exercise.theory,
        author: await this._author(),
        subject: exercise.subject,
        questions: questionRefs,
      });

      // Append exercise to subject's exercises
      await updateDoc(doc(db, 'subjects', exercise.subject.id), {
        exercises: arrayUnion(exerciseRef),
      });
    });

    notify({
      type: 'success',
      group: 'exercises',
      title: 'Exercise created successfully',
    });
  }

  public static async delete(exercise: Exercise) {
    // Delete exercise's questions
    exercise.questions.forEach(async (question: any) => {
      await deleteDoc(doc(db, 'questions', question.id));
    });

    // Remove exercise from subject's exercises
    await updateDoc(doc(db, 'subjects', exercise.subject.id), {
      exercises: arrayRemove(doc(db, 'exercises', exercise.id)),
    });

    // Delete exercise
    await deleteDoc(doc(db, 'exercises', exercise.id));

    notify({
      type: 'success',
      group: 'exercises',
      title: 'Exercise deleted successfully',
    });
  }
}
