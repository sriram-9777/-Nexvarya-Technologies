import { addDoc, collection, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export type BusinessRequest = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  serviceInterest: string;
  message: string;
  status: string;
  createdAt: string;
};

export async function createBusinessRequest(data: Omit<BusinessRequest, 'id' | 'status' | 'createdAt'>) {
  const ref = await addDoc(collection(db, 'businessRequests'), {
    ...data,
    status: 'new',
    createdAt: serverTimestamp()
  });
  return { id: ref.id, ...data, status: 'new', createdAt: new Date().toISOString() };
}

export async function getBusinessRequests(): Promise<BusinessRequest[]> {
  const snapshot = await getDocs(query(collection(db, 'businessRequests'), orderBy('createdAt', 'desc')));
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    const timestamp = data.createdAt?.toDate?.();
    return { id: doc.id, ...data, createdAt: timestamp ? timestamp.toISOString() : '' } as BusinessRequest;
  });
}
