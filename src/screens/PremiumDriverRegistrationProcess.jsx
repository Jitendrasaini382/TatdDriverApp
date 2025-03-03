import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {AppColors} from '../assets/Colors';
import Header from '../components/Header';

const PremiumDriverRegistrationProcess = () => {
  return (
    <>
      <Header backButton={true} />
      <SafeAreaView style={{flex: 1, paddingHorizontal: 10, marginTop:20}}>
        <ScrollView contentContainerStyle={{paddingBottom: 100}}>
          <View>
            <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>
              Registration process
            </Text>
            <Text style={{color: 'black', fontSize: 14}}>
              Follow the steps to complete your registration
            </Text>
          </View>
          <View
            style={{
              height: 17,
              borderRadius: 50,
              overflow: 'hidden',
              position: 'relative',
              backgroundColor: AppColors.gray,
              marginTop: 15,
            }}>
            <View
              style={{
                height: '100%',
                position: 'absolute',
                width: '20%',
                left: 0,
                backgroundColor: 'green',
              }}
            />
          </View>
          <View style={{marginTop: 15}}>
            <Text style={{color: AppColors.black, fontWeight: 'bold'}}>
              Step of 5 completed
            </Text>
          </View>
          <View style={styles.boxContainer}>
            <Text style={styles.boxHeading}>
              Step 1: Purchase premium uniform
            </Text>
            <Text style={styles.boxcaption}>
              You need to purchase the premium uniform package to proceed{' '}
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <TouchableOpacity style={styles.boxbtn}>
                <Text style={styles.boxbtnText}>Pending</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.boxContainer}>
            <Text style={styles.boxHeading}>
              Step 2: Interview via On-call or Video Call
            </Text>
            <Text style={styles.boxcaption}>
              After purchasing the uniform, an interview will be conducted. If
              successful, your uniform will be ordered and sent to your address.
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <TouchableOpacity style={styles.boxbtn}>
                <Text style={styles.boxbtnText}>Pending</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.boxContainer}>
            <Text style={styles.boxHeading}>
              Step 3: Uniform Fabric Received
            </Text>
            <Text style={styles.boxcaption}>
              Once you receive the uniform, get it tailored and take a full
              photo of yourself wearing it. Upload the photo to continue.{' '}
            </Text>
            <View
              style={{
                height: 150,
                flexDirection: 'row',
                marginTop: 10,
                gap: 5,
              }}>
              <View style={{flex: 1}}>
                <Image
                  style={{width: '100%', height: '100%'}}
                  resizeMethod="resize"
                  source={{uri: 'https://picsum.photos/200/300'}}
                />
              </View>
              <View style={{flex: 1}}>
                <Image
                  style={{width: '100%', height: '100%'}}
                  resizeMethod="resize"
                  source={{uri: 'https://picsum.photos/200/300'}}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: 10,
              }}>
              <TouchableOpacity style={styles.boxbtn}>
                <Text style={styles.boxbtnText}>Pending</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.boxContainer}>
            <Text style={styles.boxHeading}>Step 4: Upload Photo</Text>
            <Text style={styles.boxcaption}>
              Upload the photo of yourself in the tailored uniform. Your premium
              service account will then be activated.
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <TouchableOpacity style={styles.boxbtn}>
                <Text style={styles.boxbtnText}>Pending</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.boxContainer}>
            <Text style={styles.boxHeading}>
              Step 5: Activate Premium Service Account
            </Text>
            <Text style={styles.boxcaption}>
              Once your photo is approved, your premium service account will be
              activated.
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <TouchableOpacity style={styles.boxbtn}>
                <Text style={styles.boxbtnText}>Pending</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: AppColors.white,
    elevation: 2,
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  boxHeading: {color: 'black', fontWeight: 'bold', fontSize: 22},
  boxcaption: {fontSize: 14, color: AppColors.black, marginTop: 5},
  boxbtn: {
    backgroundColor: 'orange',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  boxbtnText: {color: AppColors.white, fontSize: 14},
});
export default PremiumDriverRegistrationProcess;
