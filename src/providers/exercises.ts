import { db } from '@/firebase';
import type Exercise from '@/models/exercise';
import type Question from '@/models/question';
import router from '@/router';
import { notify } from '@kyvg/vue3-notification';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
} from 'firebase/firestore';
import { useCollection, useCurrentUser } from 'vuefire';

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
      console.log('Got values: ==> ');
      console.log(questionRefs);
      // Create exercise in exercises collection
      await addDoc(collection(db, 'exercises'), {
        title: exercise.title,
        theory: exercise.theory,
        author: await this._author(),
        subjects: exercise.subjects,
        questions: questionRefs,
        // TODO: subjects and questions
      });
    });

    notify({
      type: 'success',
      group: 'exercises',
      title: 'Exercise created successfully',
    });
  }

  public static delete(exercise: any) {
    // Delete subject
    deleteDoc(doc(db, 'exercises', exercise.id));
    notify({
      type: 'success',
      group: 'subjects',
      title: 'Exercise deleted successfully',
    });
  }
}
