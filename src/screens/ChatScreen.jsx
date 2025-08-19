import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Linking,
  BackHandler,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CallingGif} from '../assets/images';
import {
  GET_ALL_CHATS_BY_BOOKING_NUMBER,
  INSERT_CHATS_BY_BOOKING_NUMBER,
} from '../apis/Apis';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {RefreshControl} from 'react-native';
import {AppColors} from '../assets/Colors';
import messaging from '@react-native-firebase/messaging';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Platform} from 'react-native';

const ChatScreen = ({navigation}) => {
  const route = useRoute();
  const inputRef = useRef()
  const [message, setMessage] = useState('');
  const flatListRef = React.useRef(null);
  const {bookingNumber} = route?.params;
  const [allChats, setAllChats] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [suggestChat, setSuggestChat] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loader, setLoader] = useState(false);
  const [driverNumber, setDriverNumber] = useState('');
  const handleIncomingMessages = () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      getAllChats();
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribeMessages = handleIncomingMessages();
    return () => unsubscribeMessages();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (bookingNumber) {
        getAllChats();
      }
    }, []),
  );

  const getAllChats = async () => {
    // Keyboard.dismiss();
    try {
      const res = await GET_ALL_CHATS_BY_BOOKING_NUMBER({
        booking_number: bookingNumber,
      });
      setAllChats(res?.response);
      setSuggestChat(res?.chat_suggestion);
      setCustomerName(res?.customer_name);
      setDriverNumber(res?.driver_ivr_number);
      setTimeout(() => {
        if (flatListRef.current) {
          flatListRef.current.scrollToOffset({
            offset: 999999, // ek bahut bada number de do
            animated: true,
          });
        }
      }, 100);
    } catch (err) {
      console.log(err);
    } finally {
      setRefreshing(false);
      setLoader(false);
    }
  };

  const handleSubmit = async () => {
    if (!message.trim()) return;
    // inputRef.current?.focus(); 

    setLoader(true);
    try {
      const res = await INSERT_CHATS_BY_BOOKING_NUMBER({
        booking_number: bookingNumber,
        message,
      });
      setMessage(''); // Clear message after sending
      getAllChats(); // Refresh chats
      // setTimeout(() => {
      //   scrollToBottom();
      // }, 200);
    } catch (err) {
      console.log(err);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  const scrollToBottom = () => {
    if (flatListRef.current && flatListData.length > 0) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  };

  // Function to format date
  const formatDate = dateString => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Reset time to compare only dates
    const dateOnly = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );
    const todayOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const yesterdayOnly = new Date(
      yesterday.getFullYear(),
      yesterday.getMonth(),
      yesterday.getDate(),
    );

    if (dateOnly.getTime() === todayOnly.getTime()) {
      return 'Today';
    } else if (dateOnly.getTime() === yesterdayOnly.getTime()) {
      return 'Yesterday';
    } else {
      const options = {day: 'numeric', month: 'short', year: 'numeric'};
      return date.toLocaleDateString('en-GB', options);
    }
  };

  // Function to format time
  const formatTime = dateString => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Prepare data for FlatList with date headers
  const prepareDataForFlatList = messages => {
    const grouped = {};

    // Group messages by date
    messages.forEach(message => {
      const date = message?.timestamp?.split(' ')[0];
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(message);
    });

    // Convert to flat array with date headers
    const flatData = [];
    Object.keys(grouped)
      .sort((a, b) => new Date(a) - new Date(b))
      .forEach(date => {
        // Add date header
        flatData.push({
          id: `date-${date}`,
          type: 'date',
          date: date,
        });

        // Add messages for this date
        grouped[date]
          .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
          .forEach(message => {
            flatData.push({
              ...message,
              type: 'message',
            });
          });
      });

    return flatData;
  };

  const flatListData = prepareDataForFlatList(allChats);

  const renderDateHeader = date => {
    return (
      <View style={styles.dateCenter}>
        <Text style={styles.dateText}>{formatDate(date)}</Text>
      </View>
    );
  };
  const renderMessage = chat => {
    const isOutgoing = chat.source === 'Driver';
    const time = formatTime(chat.timestamp);

    if (isOutgoing) {
      return (
        <View style={styles.outgoing}>
          <View style={[styles.outgoingBubble]}>
            <Text style={styles.deletedText}>{chat.message}</Text>
            <Text style={styles.timeText}>{time}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.incoming}>
          <View style={[styles.incomingBubble]}>
            <Text
              style={{
                fontStyle: 'italic',
                color: AppColors.mainColor,
                fontSize: 15,
              }}>
              {chat.message}
            </Text>
            <Text
              style={{
                textAlign: 'right',
                fontSize: 10,
                color: AppColors.greyColor,
                marginTop: 4,
              }}>
              {time}
            </Text>
          </View>
        </View>
      );
    }
  };

  const renderFlatListItem = ({item}) => {
    if (item.type === 'date') {
      return renderDateHeader(item.date);
    } else {
      return renderMessage(item);
    }
  };

  const openPhoneDialer = phoneNumber => {
    let url = `tel:${phoneNumber}`;
    Linking.openURL(url);
  };

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('DutyReportUpdate', {
        bookingNumber: bookingNumber,
        state: 'chat',
      });
      return true; // prevent default behavior (going back)
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // cleanup
  }, []);

  const handleSuggestedMessage = async text => {
    if (!text.trim()) return;
    setMessage(text);
    // Keyboard.dismiss();
    setLoader(true);
    try {
      await INSERT_CHATS_BY_BOOKING_NUMBER({
        booking_number: bookingNumber,
        message: text,
      });
      setMessage('');
      getAllChats();
      setTimeout(() => {
        scrollToBottom();
      }, 200);
    } catch (err) {
      console.log(err);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  const ListHeaderCards = () => {
    const flatListRef = useRef();
    const [activeIndex, setActiveIndex] = useState(0);

    const cardData = [
      {
        id: '1',
        bg: '#F2E9FF',
        icon: 'user-secret',
        color: '#8A2BE2',
        text: 'We keep your identity and contact number confidential',
      },
      {
        id: '2',
        bg: '#E6F1FF',
        icon: 'user-lock',
        color: '#FFA500',
        text: 'Do not share any personal details with customer over call or chat',
      },
      {
        id: '3',
        bg: '#FFF3EC',
        icon: 'ban',
        color: '#FF5E5E',
        text: 'Do not ask the customer for the PIN before the ride begins.',
      },
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        const nextIndex = (activeIndex + 1) % cardData.length;
        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({index: nextIndex, animated: true});
        }
        setActiveIndex(nextIndex);
      }, 3000); // Slower interval for better UX

      return () => clearInterval(interval);
    }, [activeIndex]);

    const onScroll = e => {
      const scrollX = e.nativeEvent.contentOffset.x;
      const index = Math.round(scrollX / 280); // card width
      setActiveIndex(index);
    };

    return (
      <View style={{paddingVertical: 12}}>
        <FlatList
          ref={flatListRef}
          data={cardData}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 10}}
          onScroll={onScroll}
          scrollEventThrottle={16}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: item.bg,
                padding: 14,
                borderRadius: 12,
                marginRight: 12,
                width: 280,
              }}>
              <FontAwesome5
                name={item.icon}
                size={20}
                color={item.color}
                solid
                style={{marginRight: 10}}
              />
              <Text style={{flex: 1, fontSize: 14, color: '#333'}}>
                {item.text}
              </Text>
            </View>
          )}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          {cardData.map((_, index) => (
            <View
              key={index}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                marginHorizontal: 4,
                backgroundColor: index === activeIndex ? '#333' : '#ccc',
              }}
            />
          ))}
        </View>
      </View>
    );
  };
  // const flatListRef = useRef(null);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => {
      setTimeout(() => {
        if (flatListRef.current) {
          flatListRef.current.scrollToOffset({
            offset: 999999, 
            animated: true,
          });
        }
      }, 100);
    });

    return () => {
      showSub.remove();
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DutyReportUpdate', {
              bookingNumber: bookingNumber,
              state: 'chat',
            })
          }
          style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        {/* <Image source={TrustedPartner} style={styles.avatar} /> */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.headerTitle}>{customerName || 'Customer'}</Text>
          {/* <Text style={styles.headerSubtitle}>Business Account</Text> */}
          {driverNumber && (
            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                backgroundColor: AppColors.white,
                borderRadius: 20,
                overflow: 'hidden',
                elevation: 5,
                marginRight: 20,
              }}
              onPress={() => openPhoneDialer(driverNumber)}>
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                }}
                source={CallingGif}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
          {/* <Icon color={'white'} name="phone" style={{marginRight:20, }} /> */}
        </View>
      </View>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        // keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} // header ke hisaab se adjust karo
        style={{flex: 1}}
        contentContainerStyle={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
        <View style={{flex: 1}}>
          {/* Chat Body */}
          <FlatList
            automaticallyAdjustKeyboardInsets={true}
            ref={flatListRef}
            data={flatListData}
            renderItem={renderFlatListItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.chatBody}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            initialScrollIndex={
              flatListData.length > 0 ? flatListData.length - 1 : 0
            }
            getItemLayout={(data, index) => ({
              length: 80, // Approximate item height
              offset: 80 * index,
              index,
            })}
            onContentSizeChange={() => scrollToBottom()}
            onLayout={() => scrollToBottom()}
            ListHeaderComponent={() => <ListHeaderCards />}
            // ListHeaderComponent={() => (
            //   <View style={styles.centeredNotice}>
            //     <Text style={styles.encryptionNotice}>
            //       🔐 Messages and calls are end-to-end encrypted.
            //     </Text>
            //   </View>
            // )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  getAllChats();
                }}
              />
            }
          />
          {suggestChat && suggestChat?.length > 0 && (
            <View style={styles.suggestionContainer}>
              <FlatList
                horizontal
                data={suggestChat}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <TouchableOpacity
                    // onPress={() => setMessage(item)}
                    disabled={loader}
                    onPress={() => handleSuggestedMessage(item)}
                    style={styles.suggestionChip}>
                    <Text style={styles.suggestionText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          {/* Input */}
          <View style={styles.inputRow}>
            <TextInput
            ref={inputRef}
              placeholder="Message"
              placeholderTextColor="#999"
              value={message}
              //   onChangeText={text => setMessage(text)}
              onChangeText={text => {
                const digitCount = (text.match(/\d/g) || []).length;
                if (digitCount <= 9) {
                  setMessage(text);
                } else {
                  setMessage('');
                }
              }}
              style={styles.input}
            />
            <TouchableOpacity
              disabled={loader}
              style={styles.sendButton}
              onPress={handleSubmit}>
              {loader ? (
                <ActivityIndicator color={AppColors.white} />
              ) : (
                <Icon color={AppColors.white} name="send" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.mainColor,
    padding: 12,
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 3,
    alignSelf: 'center',
  },
  backButton: {
    padding: 4,
    marginRight: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'white',
    fontSize: 12,
  },
  chatBody: {
    padding: 12,
    gap: 10,
  },
  dateCenter: {
    alignItems: 'center',
    marginVertical: 10,
  },
  dateText: {
    backgroundColor: '#555',
    color: 'white',
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  centeredNotice: {
    alignItems: 'center',
    marginBottom: 10,
  },
  encryptionNotice: {
    backgroundColor: '#fff8dc',
    color: '#444',
    fontSize: 12,
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 2,
  },
  incoming: {
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  incomingBubble: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    maxWidth: '75%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 2,
    borderColor: AppColors.mainColor,
    borderWidth: 0.5,
  },
  outgoing: {
    alignItems: 'flex-end',
    marginBottom: 5,
  },
  outgoingBubble: {
    backgroundColor: AppColors.mainColor,
    // backgroundColor: '#c8e6c9',
    padding: 10,
    borderRadius: 20,
    borderBottomRightRadius: 0,
    maxWidth: '75%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 2,
  },
  deletedBubble: {
    backgroundColor: '#f5f5f5',
  },
  deletedText: {
    fontStyle: 'italic',
    color: AppColors.white,
    fontSize: 15,
  },
  timeText: {
    textAlign: 'right',
    fontSize: 10,
    color: AppColors.greyColor,
    marginTop: 4,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'white',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    color: AppColors.black,
  },
  sendButton: {
    backgroundColor: AppColors.mainColor,
    padding: 10,
    borderRadius: 25,
  },
  suggestionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 6,
    paddingTop: 4,
    backgroundColor: '#fff',
  },

  suggestionChip: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
  },

  suggestionText: {
    color: '#333',
    fontSize: 13,
  },
});

export default ChatScreen;
