import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Divider} from 'react-native-elements';
import axios from 'axios';
import * as firebase from 'firebase/app';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {Redirect} from 'react-router-native';
import {ClubFormInfo} from './ClubFormInfo';

const url =
  'https://us-central1-ucf-master-calendar.cloudfunctions.net/webApi/api/v1/clubs';

const ClubListModal = ({isVisible, toggle, clubList, userClubList, uid}) => {
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
  const [redirectFlag, setRedirectFlag] = useState(false);

  console.log('clublist', clubList);
  const toggleEditClub = club => {
    if (!editClub) {
      setSelectedClub(club);
      setName(club.data.name);
      setDescription(club.data.description);
      setEmail(club.data.email);
      setMeetingInfo(club.data.meetingInfo);
      setWebsite(club.data.website);
      setInstagram(club.data.instagram);
      setFacebook(club.data.facebook);
      setTwitter(club.data.twitter);
      setCoverImage(club.data.coverImage);
      setOther(club.data.other);
    }
    setEditClub(!editClub);
  };

  const handleDelete = club => {
    axios
      .delete(`${url}/${selectedClub.id}`)
      .then(res => {
        setRedirectFlag(true);
      })
      .catch(e => console.log('Error deleting to server', e.response));
  };

  const handleSubmit = () => {
    const newinfo = {
      name: name,
      description: description,
      meetingInfo: coverImage,
      website: website,
      instagram: instagram,
      facebook: facebook,
      twitter: twitter,
      coverImage: coverImage
        ? coverImage
        : 'https://i.redd.it/2l2av8at5sn31.jpg',
      other: other,
      userId: uid,
      email: email,
    };
    axios
      .put(`${url}/${selectedClub.id}`, newinfo)
      .then(res => {
        setRedirectFlag(true);
      })
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
        .catch(error => console.log(error));
    });
  };

  if (redirectFlag) {
    return <Redirect push to="/Home" />;
  }
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
          <ClubFormInfo
            nameValue={name}
            onChangeName={text => setName(text)}
            descValue={description}
            onChangeDesc={text => setDescription(text)}
            meetValue={meetingInfo}
            onChangeMeet={text => setMeetingInfo(text)}
            webValue={website}
            onChangeWeb={text => setWebsite(text)}
            instaValue={instagram}
            onChangeInsta={text => setInstagram(text)}
            faceValue={facebook}
            onChangeFace={text => setFacebook(text)}
            twitValue={twitter}
            onChangeTwit={text => setTwitter(text)}
            imageGallery={openGallery}
            coverImage={coverImage}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            showTwoButtons={true}
          />
        )}

        {!editClub &&
          userClubList.map((club, idx) => {
            console.log('club', club);
            return (
              <View key={idx} style={styles.subcontainer}>
                <TouchableOpacity
                  onPress={() => {
                    toggleEditClub(club);
                  }}>
                  <Text style={styles.subheader}>{club.data.name}</Text>
                </TouchableOpacity>
                <Divider style={styles.divider} />
              </View>
            );
          })}

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
    marginLeft: '10%',
    width: '80%',
  },
};
