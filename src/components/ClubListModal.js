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
import * as firebase from 'firebase/app';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';

const URL =
  'https://us-central1-ucf-master-calendar.cloudfunctions.net/webApi/api/v1';

const ClubListModal = ({isVisible, toggle, clubList, uid}) => {
  const [clubs, setClubs] = useState([1, 2, 3]);
  const [editClub, setEditClub] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);
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

  useEffect(() => {
    console.log(uid);
  }, []);
  const toggleEditClub = club => {
    if (!editClub) {
      setSelectedClub(club);
      const data = club.data;
      setName(data.name);
      setDescription(data.description);
      setEmail(data.email);
      setMeetingInfo(meetingInfo);
      setWebsite(data.website);
      setInstagram(data.instagram);
      setFacebook(data.facebook);
      setTwitter(twitter);
      setCoverImage(coverImage);
      setOther(other);
    }
    console.log('we in here');
    setEditClub(!editClub);
  };

  const handleSubmit = () => {
    console.log(selectedClub.id);

    axios
      .put(
        `https://us-central1-ucf-master-calendar.cloudfunctions.net/webApi/api/v1/clubs/${
          selectedClub.id
        }`,
        {
          name: name,
          description: description,
          meetingInfo: coverImage,
          website: website,
          instagram: instagram,
          facebook: facebook,
          twitter: twitter,
          coverImage: coverImage,
          other: other,
          userId: uid,
          email: email,
        },
      )
      .then(res => console.log('res', res))
      .catch(e => console.log('Error putting to server', e.response));
  };

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

  return (
    <Modal
      isVisible={isVisible}
      animationType="slide"
      transparent={true}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      onBackButtonPress={!editClub ? toggle : toggleEditClub}
      onBackdropPress={!editClub ? toggle : toggleEditClub}>
      <ScrollView style={styles.wrapper}>
        <View style={{...styles.subcontainer, paddingTop: '6%'}}>
          {!editClub && <Text style={styles.header}>Registered Clubs</Text>}
          {editClub && <Text style={styles.header}>Editing Club</Text>}
          <Divider style={styles.divider} />
        </View>

        {editClub && (
          <View key={0} style={styles.subcontainer}>
            <View style={styles.subcontainer}>
              <Text style={styles.subheader}>Club Name</Text>
              <TextInput
                value={name}
                onChangeText={text => setName(text)}
                style={styles.input}
              />
              <Divider style={styles.divider} />
            </View>

            <View style={styles.subcontainer}>
              <Text style={styles.subheader}>Description</Text>
              <TextInput
                multiline
                value={description}
                onChangeText={text => setDescription(text)}
                style={styles.input}
              />
              <Divider style={styles.divider} />
            </View>

            <View style={styles.subcontainer}>
              <Text style={styles.subheader}>Meeting Information</Text>
              <TextInput
                multiline
                value={meetingInfo}
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
                value={website}
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
                value={instagram}
                onChangeText={text => setInstagram(text)}
                style={styles.input}
              />
              <Divider style={styles.divider} />
            </View>

            <View style={styles.subcontainer}>
              <Text style={styles.subheader}>
                Facebook (Need one social media)
              </Text>
              <TextInput
                value={facebook}
                onChangeText={text => setFacebook(text)}
                style={styles.input}
              />
              <Divider style={styles.divider} />
            </View>

            <View style={styles.subcontainer}>
              <Text style={styles.subheader}>
                Twitter (Need one social media)
              </Text>
              <TextInput
                value={twitter}
                onChangeText={text => setTwitter(text)}
                style={styles.input}
              />
              <Divider style={styles.divider} />
            </View>

            <View style={styles.subcontainer}>
              <Text style={styles.subheader}>Cover Image</Text>
              <TouchableOpacity onPress={openGallery}>
                <TextInput
                  value={coverImage}
                  editable={false}
                  style={styles.input}
                />
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
          </View>
        )}

        {!editClub &&
          clubList.map((club, idx) => (
            <View key={idx} style={styles.subcontainer}>
              <TouchableOpacity
                onPress={() => {
                  toggleEditClub(club);
                }}>
                <Text style={styles.subheader}>Slightly Dank</Text>
              </TouchableOpacity>
              <Divider style={styles.divider} />
            </View>
          ))}

        <View style={{flex: 1, marginBottom: '5%'}} />
      </ScrollView>
    </Modal>
  );
};

export {ClubListModal};

const styles = {
  wrapper: {
    flex: 1,
    height: '100%',
    backgroundColor: 'white',
  },
  subcontainer: {
    flex: 1,
    paddingLeft: '8%',
    paddingRight: '8%',
    marginTop: '2%',
  },
  header: {
    fontFamily: 'Pacifico',
    fontSize: 20,
    textAlign: 'center',
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
    marginLeft: 20,
    width: '80%',
  },
};
