/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

import Gr4vyPayments, {
  Gr4vyPaymentsEventEmitter,
  Gr4vyTransactionResult,
  Gr4vyPaymentMethod,
} from './Gr4vyPayments';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onPaymentMethodSelected = (paymentMethod: Gr4vyPaymentMethod) => {
    console.log('onPaymentMethodSelected', paymentMethod);
  };

  const startPayment = () => {
    const env = 'sandbox';
    const token =
      'eyJhbGciOiJSUzUxMiIsImtpZCI6IkFSOTBtWWFaTGZGS1FRbEFaYmZDQ2JKczFkTGJfcGdCYk1lUlRjOVdBOUEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJQYXVsIEwgUk4gU3BpZGVyIFRlc3QiLCJuYmYiOjE2Nzc4MzQ3MjAsImV4cCI6MTcwOTM3MDcyMCwianRpIjoiZTBkYzZmN2UtNWQxZC00YzA1LWI5ZjEtM2M2ZGZiZWY0ZjIzIiwic2NvcGVzIjpbIioucmVhZCIsIioud3JpdGUiXSwiZW1iZWQiOnsiYW1vdW50IjoiMTAwMCIsImN1cnJlbmN5IjoiVVNEIn19.qMWPXJLf46th_f9dJICX4hSzX2aQPM0l7TptFZhUmY40NzCAHrPxS-kofg3Byo1UVPVg47YoMkMQiAcNfyV1-Dw3HUcsKfv7SAw5omWXRghgMQ37CsIPGHINBTMlysta5vV9A63dkpDKyJ8PeXREOqhG01ih-F1LKXwcm9mccyyuKkrFFhRv47zFKdaPkbM-j1GN0qxP27RRvTxBwA52CWPi2heZO8nmqWkGXepcsoi1TP_wpzg-pIAPCPvngZG9mz_gx8KrGyAtMkqqXxGXIGF7e59BRiwu9w0JYXlan4ITM4f2dgE4YhN384fDHvKm_K9RipUcMXBj0PUWuX2LucCqClfv9ZmRFdts2tFTc6NqPCmFlcRMgjj4oHT84ObXjC3s9G7G5NWVgt8tkLh4nesbJ-UUZdR6krwkKsZRq0LKsV9YxRmB4GGMCC0If2SuIlzhfD00veQRFghn9FPxkXHvrSPVqt4aXYGJtkH19WLkFrU1fN4hnxhHnrrYIcll';
    const amount = 1000;
    const currency = 'USD';
    const country = 'US';

    const onPaymentMethodSelectedSubscription =
      Gr4vyPaymentsEventEmitter.addListener(
        'onPaymentMethodSelected',
        onPaymentMethodSelected,
      );

    Gr4vyPayments.showPaymentSheet(
      'spider',
      token,
      amount,
      currency,
      country,
      null,
      env,
      (error: string) => {
        console.error(error);
        onPaymentMethodSelectedSubscription.remove();
      },
      (transactionResult: Gr4vyTransactionResult) => {
        console.log(transactionResult);
        onPaymentMethodSelectedSubscription.remove();
      },
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            padding: 10,
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Button title="Start Payment" onPress={startPayment} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
