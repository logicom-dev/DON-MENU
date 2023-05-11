import shortid from 'shortid';
import  storage from "../firebaseConfig";
export const server = {
    // this uploads the image using firebase
    process: (fieldName, file, metadata, load, error, progress, abort) => {
      // create a unique id for the file
      const id = shortid.generate()
  
      // upload the image to firebase
      const task = storage.child('files/' + id).put(file, {
        contentType: 'image/jpeg',
      })
  
      // monitor the task to provide updates to FilePond
      task.on(
        storage.TaskEvent.STATE_CHANGED,
        snap => {
          // provide progress updates
          progress(true, snap.bytesTransferred, snap.totalBytes)
        },
        err => {
          // provide errors
          error(err.message)
        },
        () => {
          // the file has been uploaded
          load(id)
          //onRequestSave(id)
        }
      )
    },
  
    // this loads an already uploaded image to firebase
    load: (source, load, error, progress, abort) => {
      // reset our progress
      progress(true, 0, 1024)
  
      // fetch the download URL from firebase
      storage
        .child('files/' + source)
        .getDownloadURL()
        .then(url => {
          // fetch the actual image using the download URL
          // and provide the blob to FilePond using the load callback
          let xhr = new XMLHttpRequest()
          xhr.responseType = 'blob'
          xhr.onload = function(event) {
            let blob = xhr.response
            load(blob)
          }
          xhr.open('GET', url)
          xhr.send()
        })
        .catch(err => {
          error(err.message)
          abort()
        })
    },
  }