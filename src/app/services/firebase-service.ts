import { Injectable, inject } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL, deleteObject } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {

  private storage = inject(Storage);

  // Subir imagen
  async uploadImage(file: File, path: string): Promise<string> {
    const storageRef = ref(this.storage, path);

    const uploadTask = await uploadBytes(storageRef, file);

    const downloadUrl = await getDownloadURL(uploadTask.ref);

    return downloadUrl; 
  }

  // Eliminar imagen
  async deleteImage(path: string): Promise<void> {
    try {
      const fileRef = ref(this.storage, path);
      await deleteObject(fileRef);
    } catch (err: any) {
      console.error('Error eliminando imagen:', err);
    }
  }
}
