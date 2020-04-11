import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Button, Divider} from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';
import 'firebase/auth';
import queryString from 'query-string';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
// import Flag from 'react-native-flags';

const URL =
  'https://us-central1-ucf-master-calendar.cloudfunctions.net/webApi/api/v1';

const ClubModalForm = ({isVisible, toggle}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('email');
  const [meetingInfo, setMeetingInfo] = useState('');
  const [website, setWebsite] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [twitter, setTwitter] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [other, setOther] = useState('other');
  const [uid, setuid] = useState('');

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setuid(user.uid);
      }
    });
  }, []);

  const openGallery = () => {
    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;

    ImagePicker.openPicker({
      includeBase64: true,
      mediaType: 'photo',
      cropping: true,
      cropperCircleOverlay: true,
    }).then(image => {
      const imagePath = image.path;
      let uploadBlob = null;
      let mime = 'image/jpg';
      const imageRef = firebase
        .storage()
        .ref('clubs/coverImage')
        .child(uid);

      fs.readFile(imagePath, 'base64')
        .then(data => {
          return Blob.build(data, {type: `${mime};BASE64`});
        })
        .then(blob => {
          uploadBlob = blob;
          return imageRef.put(blob, {contentType: mime});
        })
        .then(() => {
          uploadBlob.close();
          return imageRef.getDownloadURL();
        })
        .then(url => {
          setCoverImage(url);
        })
        .catch(error => {
          console.log(error);
        });
    });
  };

  const reset = () => {
    setName('');
    setDescription('');
    setWebsite('');
    setInstagram('');
    setFacebook('');
    setTwitter('');
  };

  const handleSubmit = () => {
    axios
      .post(`${URL}/clubs`, {
        name: name,
        description: description,
        meetingInfo: meetingInfo,
        website: website,
        instagram: instagram,
        facebook: facebook,
        twitter: twitter,
        coverImage: coverImage,
        other: other,
        userId: uid,
        email: email,
      })
      .then(res => console.log('res', res))
      .catch(e => console.log('Error posting to server', e.response));
  };

  return (
    <Modal
      isVisible={isVisible}
      animationType="slide"
      onModalWillShow={reset}
      transparent={true}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      onBackButtonPress={toggle}
      onBackdropPress={toggle}>
      <ScrollView
        style={{
          flex: 1,
          height: '100%',
          backgroundColor: 'white',
        }}>
        <View style={{...styles.subcontainer, paddingTop: '8%'}}>
          <Text
            style={{fontFamily: 'Pacifico', fontSize: 20, textAlign: 'center'}}>
            Connecting Club To Account
          </Text>
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.subheader}>Club Name</Text>
          <TextInput
            onChangeText={text => setName(text)}
            style={styles.input}
          />
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.subheader}>Description</Text>
          <TextInput
            multiline
            onChangeText={text => setDescription(text)}
            style={styles.input}
          />
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.subheader}>Meeting Information</Text>
          <TextInput
            multiline
            onChangeText={text => setMeetingInfo(text)}
            style={styles.input}
          />
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.subheader}>
            Club Website (Need one social media)
          </Text>
          <TextInput
            onChangeText={text => setWebsite(text)}
            style={styles.input}
          />
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.subheader}>
            Instagram (Need one social media)
          </Text>
          <TextInput
            onChangeText={text => setInstagram(text)}
            style={styles.input}
          />
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.subheader}>Facebook (Need one social media)</Text>
          <TextInput
            onChangeText={text => setFacebook(text)}
            style={styles.input}
          />
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.subheader}>Twitter (Need one social media)</Text>
          <TextInput
            onChangeText={text => setTwitter(text)}
            style={styles.input}
          />
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.subheader}>Cover Image</Text>
          <TouchableOpacity onPress={openGallery}>
            <TextInput editable={false} style={styles.input} />
          </TouchableOpacity>
          <Divider style={styles.divider} />
        </View>

        <View style={styles.subcontainer}>
          <Button
            title="Submit"
            buttonStyle={styles.submitButton}
            titleStyle={{color: '#03A9F4'}}
            onPress={handleSubmit}
          />
        </View>
        <View style={{flex: 1, marginBottom: '5%'}} />
      </ScrollView>
    </Modal>
  );
};

export {ClubModalForm};

const styles = {
  subcontainer: {
    flex: 1,
    paddingLeft: '8%',
    paddingRight: '8%',
  },
  subheader: {
    fontSize: 17,
    marginTop: '2%',
    textAlign: 'center',
  },
  divider: {
    height: '2%',
    marginTop: '5%',
    backgroundColor: 'black',
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  submitButton: {
    borderColor: '#03A9F4',
    marginTop: '3%',
    borderWidth: 1.5,
    borderRadius: 10,
    backgroundColor: 'white',
    marginLeft: '10%',
    width: '80%',
  },
};
