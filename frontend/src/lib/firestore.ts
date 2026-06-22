import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase"
export const saveMeeting = async (
  uid: string,
  meetingData: any
) => {
  try {
    await addDoc(
      collection(db, "users", uid, "meetings"),
      {
        ...meetingData,
        createdAt: serverTimestamp(),
      }
    );

    console.log("Meeting saved");
  } catch (error) {
    console.error(error);
  }
};