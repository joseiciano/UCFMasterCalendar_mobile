import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Divider, Button} from 'react-native-elements';
import {useHistory} from 'react-router-native';

const ClubFormInfo = ({
  nameValue,
  onChangeName,
  descValue,
  onChangeDesc,
  meetValue,
  onChangeMeet,
  webValue,
  onChangeWeb,
  instaValue,
  onChangeInsta,
  faceValue,
  onChangeFace,
  twitValue,
  onChangeTwit,
  imageGallery,
  coverImage,
  handleSubmit,
  handleDelete,
  showTwoButtons,
  emailValue,
  onChangeEmail,
}) => {
  return (
    <View key={0} style={styles.subcontainer}>
      <View style={styles.subcontainer}>
        <Text style={styles.subheader}>Club Name</Text>
        <TextInput
          value={nameValue}
          onChangeText={onChangeName}
          style={styles.input}
        />
        <Divider style={styles.divider} />
      </View>

      <View style={styles.subcontainer}>
        <Text style={styles.subheader}>Description</Text>
        <TextInput
          multiline
          value={descValue}
          onChangeText={onChangeDesc}
          style={styles.input}
        />
        <Divider style={styles.divider} />
      </View>

      <View style={styles.subcontainer}>
        <Text style={styles.subheader}>Email</Text>
        <TextInput
          multiline
          value={emailValue}
          onChangeText={onChangeEmail}
          style={styles.input}
        />
        <Divider style={styles.divider} />
      </View>

      <View style={styles.subcontainer}>
        <Text style={styles.subheader}>Meeting Information</Text>
        <TextInput
          multiline
          value={meetValue}
          onChangeText={onChangeMeet}
          style={styles.input}
        />
        <Divider style={styles.divider} />
      </View>

      <View style={styles.subcontainer}>
        <Text style={styles.subheader}>
          Club Website (Need one social media)
        </Text>
        <TextInput
          value={webValue}
          onChangeText={onChangeWeb}
          style={styles.input}
        />
        <Divider style={styles.divider} />
      </View>

      <View style={styles.subcontainer}>
        <Text style={styles.subheader}>Instagram (Need one social media)</Text>
        <TextInput
          value={instaValue}
          onChangeText={onChangeInsta}
          style={styles.input}
        />
        <Divider style={styles.divider} />
      </View>

      <View style={styles.subcontainer}>
        <Text style={styles.subheader}>Facebook (Need one social media)</Text>
        <TextInput
          value={faceValue}
          onChangeText={onChangeFace}
          style={styles.input}
        />
        <Divider style={styles.divider} />
      </View>

      <View style={styles.subcontainer}>
        <Text style={styles.subheader}>Twitter (Need one social media)</Text>
        <TextInput
          value={twitValue}
          onChangeText={onChangeTwit}
          style={styles.input}
        />
        <Divider style={styles.divider} />
      </View>

      <View style={styles.subcontainer}>
        <Text style={styles.subheader}>Cover Image</Text>
        <TouchableOpacity onPress={imageGallery}>
          <TextInput value={coverImage} editable={false} style={styles.input} />
        </TouchableOpacity>
        <Divider style={styles.divider} />
      </View>

      {showTwoButtons && (
        <View style={{flexDirection: 'row'}}>
          <View style={styles.subcontainer}>
            <Button
              title="Delete"
              buttonStyle={styles.submitButton}
              titleStyle={{color: '#03A9F4'}}
              onPress={handleDelete}
            />
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
      {!showTwoButtons && (
        <View style={styles.subcontainer}>
          <Button
            title="Submit"
            buttonStyle={{
              borderColor: '#03A9F4',
              marginTop: '3%',
              borderWidth: 1.5,
              borderRadius: 10,
              backgroundColor: 'white',
              marginLeft: '10%',
              width: '80%',
            }}
            titleStyle={{color: '#03A9F4'}}
            onPress={handleSubmit}
          />
        </View>
      )}
      <View style={{flex: 1, marginBottom: '5%'}} />
    </View>
  );
};

export {ClubFormInfo};

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
    textAlign: 'center',
    backgroundColor: 'white',
  },
  submitButton: {
    borderColor: '#03A9F4',
    marginTop: '3%',
    borderWidth: 1.5,
    borderRadius: 10,
    backgroundColor: 'white',
    marginLeft: '6%',
    width: '95%',
  },
};
