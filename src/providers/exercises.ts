import { db } from '@/firebase';
import { notify } from '@kyvg/vue3-notification';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { ref } from 'vue';
import { useCollection } from 'vuefire';

export default class ExercisesProvider {
    public static all() {
        return useCollection(collection(db, 'exercises'));
    }
    public static delete(exercise: any) {
        // Delete subject
        deleteDoc(doc(db, 'exercises', exercise.id));
        notify({
            type: "success",
            group: "subjects",
            title: "Exercise deleted successfully",
        });
    }

}