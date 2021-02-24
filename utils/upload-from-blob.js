import firebase from "@/lib/firebase"

export const uploadFromBlob = async ({ path, blobUri, name, type, ...meta }) => {
    if (!blobUri || !name) return
  
    const response = await fetch(blobUri)
    const blob = await response.blob()
    const filename = `${path}${name}_${Date.now()}`
    const snapshot = await firebase.storage().ref().child(name).put(blob, meta)
    const downloadLink = await snapshot.ref.getDownloadURL()

    return {
      name,
      filename,
      type,
      downloadLink
    }
  }