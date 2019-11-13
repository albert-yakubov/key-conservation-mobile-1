import React from "react";
import { Button, Text, View, TouchableOpacity} from "react-native";

const VerifyOrganizationScreen = (props) => {

    //PLEASE NOTE: THE "NEXT BUTTON ON HERE DOES NOT WORK..."
    return (
        <View>
            <Text>Verify your organization</Text>
            <Text>How will you be receiving payments?</Text>
            <Text>An external link</Text>
            <Text>Bank account</Text>
            <Text>Checking account</Text>
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate()
                }}
            >
                <Text>Next</Text>
            </TouchableOpacity>
        </View>
    );
}

export default VerifyOrganizationScreen;