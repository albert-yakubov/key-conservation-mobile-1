import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import styles from "../../constants/screens/org-onboarding-styles/TellAboutOrg.js";
import * as SecureStore from "expo-secure-store";
import GooglePlacesInput from "../../components/Search/GooglePlaceInput";

const TellAboutOrganizationScreen = props => {
  const [airtableKey, setAirtableKey] = useState({
    key: ""
  });
  const [airtableState, onChangeText] = useState({
    org_name: "",
    website: "",
    address: "",
    country: "",
    phone: "",
    point_of_contact: "",
    poc_position: "",
    email: ""
  }); // This state holds field data for airtable create(), and backend for later use.

  getEmail = async () => {
    const email2 = await SecureStore.getItemAsync("email", {});
    const key = await SecureStore.getItemAsync("airtableKey", {});
    onChangeText({ email: email2 });
    setAirtableKey({ key: key });
  }; // This assigns the current account's email to the new airtable form.

  useEffect(() => {
    getEmail();
  }, []);

  // var Airtable = require("airtable");
  // var base = new Airtable({ apiKey: airtableKey }).base("appbPeeXUSNCQWwnQ"); // These are the Airtable variables ^^^

  const sendAirtable = () => {
    // this creates a new Airtable form.
    // console.log("key: " + airtableKey.key);
    var Airtable = require("airtable");
    var base = new Airtable({ apiKey: airtableKey.key }).base(
      "appbPeeXUSNCQWwnQ"
    ); // These are the Airtable variables ^^^
    base("Table 1").create(
      [
        {
          fields: {
            org_name: airtableState.org_name,
            website: airtableState.website,
            phone: airtableState.phone,
            address: airtableState.address,
            country: airtableState.country,
            point_of_contact: airtableState.point_of_contact,
            poc_position: airtableState.poc_position,
            email: airtableState.email
          }
        }
      ],
      function(err, records) {
        if (err) {
          console.error(err + "*** test ***");
          return;
        }
        records.forEach(function(record) {
          let airtableID = record.getId();
          props.navigation.navigate("VerifyOrganization", {
            airtableID: airtableID,
            airtableState: airtableState,
            airtableKey: airtableKey.key
          }); // This passes the returned form ID and the needed fields for backend and airtable update() to the next component.
        });
      }
    );
  };
  
  
  const notifyChange = (e)=>{
      console.log("notifyChange e",e)
  }

  return (
    <KeyboardAvoidingView
      style={styles.obBody}
      // behavior="height"
      keyboardVerticalOffset={86}
      enabled
    >
     
      <ScrollView>
        <GooglePlacesInput
            notifyChange={notifyChange}
        />
        {/* <View style={styles.obTextTopContainer}>
                <Text style={styles.obTextTop}>1 of 4</Text>
                </View> */}
        <Text style={styles.obTitle}>Tell us about your organization.</Text>
        <Text style={styles.obText}>
          Tell us about your main branch or headquarters. You'll have a chance
          to give more details on the next screen.
        </Text>
        <Text style={styles.obSubtitle}>Your Organization</Text>

        {/* <Text style={styles.obFieldName}>Organization Name</Text> */}
        <TextInput
          placeholder="Org Name"
          style={styles.obTextInput}
          onChangeText={text =>
            onChangeText({ ...airtableState, org_name: text })
          }
        />

         {/*<Text style={styles.obFieldName}>Organization Address</Text>*/}
        <TextInput
          placeholder="Main Address"
          style={styles.obTextInput}
          onChangeText={text =>
            onChangeText({ ...airtableState, address: text })
          }
          value={airtableState.address}
        />
  
        <GooglePlacesInput
            notifyChange={notifyChange}
            placeHolder="Address"
            types="geocode"
            currentLocation={true}
        />
  
        {/*<View style={{ position: 'relative', height: 50 }}>*/}
          <GooglePlacesInput style={{  container: { position: 'absolute', height: 50, zIndex:100} }}
                             notifyChange={notifyChange}
                             placeHolder="City"
                             types="(cities)"
                             currentLocation={false}
           />
        {/*</View>*/}
        
        {/*<Text style={{marginBottom:10}}>Organization Address</Text>*/}

        {/* <Text style={styles.obFieldName}>Organization Country</Text> */}
        <TextInput
          placeholder="Country"
          style={styles.obTextInput}
          onChangeText={text =>
            onChangeText({ ...airtableState, country: text })
          }
          value={airtableState.country}
        />

        {/* <Text style={styles.obFieldName}>Point of Contact Name</Text> */}
        <TextInput
          placeholder="Point Of Contact Name"
          style={styles.obTextInput}
          onChangeText={text =>
            onChangeText({ ...airtableState, point_of_contact: text })
          }
          value={airtableState.point_of_contact}
        />

        {/* <Text style={styles.obFieldName}>Point of Contact Position</Text> */}
        <TextInput
          placeholder="Point Of Contact Position"
          style={styles.obTextInput}
          onChangeText={text =>
            onChangeText({ ...airtableState, poc_position: text })
          }
          value={airtableState.poc_position}
        />

        {/* backend */}
        {/* <Text style={styles.obFieldName}>Organization Phone</Text> */}
        <TextInput
          placeholder="Org Phone"
          style={styles.obTextInput}
          onChangeText={text => onChangeText({ ...airtableState, phone: text })}
          value={airtableState.phone}
        />
        {/* backend */}

        {/* <Text style={styles.obFieldName}>Website URL</Text> */}
        <TextInput
          placeholder="Website Url"
          style={styles.obTextInputBottom}
          onChangeText={text =>
            onChangeText({ ...airtableState, website: text })
          }
          value={airtableState.website}
        />

        <TouchableOpacity
          style={styles.obFwdContainer}
          onPress={() => {
            if (
              airtableState.org_name === undefined ||
              airtableState.website === undefined ||
              airtableState.phone === undefined ||
              airtableState.address === undefined ||
              airtableState.country === undefined ||
              airtableState.point_of_contact === undefined ||
              airtableState.poc_position === undefined ||
              airtableState.email === undefined
            ) {
              Alert.alert("Oops", "Please fill in all sections of form", [
                { text: "Got it" }
              ]);
            } else {
              sendAirtable();
            }
          }}
        >
          <Text style={styles.obFwdBtnText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TellAboutOrganizationScreen;
