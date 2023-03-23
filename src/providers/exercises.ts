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
import type Question from '@/models/question';

const { notify } = useNotification();
const user = useCurrentUser();

export default class ExercisesProvider {
  public static all() {
    return useCollection(collection(db, 'exercises'));
  }

  private static async _author() {
    const documentName = user.value?.uid;

    // Get author reference
    // https://stackoverflow.com/a/73466093
    const documentRef = doc(collection(db, 'users'), documentName!);
    const documentSnap = await getDoc(documentRef);
    const authorRef = documentSnap.ref;

    return authorRef;
  }

  public static async create(exercise: Exercise) {
    if (!user.value) {
      notify({
        type: 'error',
        group: 'exercises',
        title: 'You must be logged in to create an exercise',
      });

      throw new Error('You must be logged in to create an exercise');
    }

    // First, create exercise's questions in firebase
    // Create subject in subjects collection
    const questionsRef = exercise.questions.map(async (question) => {
      return await addDoc(collection(db, 'questions'), {
        caption: question.caption,
        answers: question.answers.map((answer) => {
          return {
            value: answer.value,
            is_correct: answer.is_correct,
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
        subject: exercise.subject.ref,
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

  public static async answer(exercise: Exercise, questions: Question[]) {
    // If the user is not logged in, we don't save the answers
    if (!user.value) {
      return;
    }

    // We have to manually fetch the references to the questions and exercise
    // so we can store a reference in the fulfillment document instead of raw data
    // of the whole objects
    const exerciseRef = doc(db, 'exercises', exercise.id);

    // Check if there is an existing fulfillment for this question
    return await addDoc(collection(db, 'fulfillments'), {
      author: await this._author(),
      exercise: exerciseRef,
      result: questions
        .filter((q) => q.answers.some((a) => a.selected))
        .map((q) => {
          return {
            question: doc(db, 'questions', q.id),
            answers: q.answers.filter((a) => a.selected).map((a) => a.value),
          };
        }),
    });
  }
}
