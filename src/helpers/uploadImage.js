import storage from '@react-native-firebase/storage';

export default file => onSuccess => onError => {
  console.log('🚀 ~ file: uploadImage.js ~ line 4 ~ file', file);
  const path = "contact-pictures/user/777/" + file.creationDate || file.path;

  // create a ref
  const ref = storage().ref(path);

  // creaate a task
  const task = ref.putFile(file.path);
  // upload file
  task
    .then(async () => {
      const url = await ref.getDownloadURL();
      onSuccess(url);
    })
    .catch(error => {
      onError(error);
    });
};
