/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const {Gr4vyPayments, RNGr4vyEvents} = NativeModules;
const Gr4vyPaymentsEventEmitter = new NativeEventEmitter(RNGr4vyEvents);

const GR4VY_ENV = 'sandbox';
const GR4VY_TOKEN =
  'eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6Ik1GOXQwSHQ1ZlljRDRIUzZab1FqRGRDb2VqU2NTMUU1QUk5RklSVmRoQVkifQ.eyJzY29wZXMiOlsiZW1iZWQiXSwiZW1iZWQiOnsiYW1vdW50Ijo1MDUwLCJjdXJyZW5jeSI6IkdCUCJ9LCJpYXQiOjE2Nzc3NzA4MDksIm5iZiI6MTY3Nzc3MDgwOSwiZXhwIjoxNjc3Nzc0NDA5LCJpc3MiOiJHcjR2eSBTREsgMC4yNy4wIC0gTm9kZSB2MTYuMTYuMCIsImp0aSI6Ijk2MWM3MWRkLWIzYjItNDBjZS1hMzAyLTQzMGMyYzAyNjg3YiJ9.ANsXORLMA_jtqtoI-ddgScfIrJ7GhaGeUifxtlWZ2rNFbvGWi0HD-s3SakXjyGDQgM7XKFE2FW4GayJqSaTuVNpOAPBceTfb5VWJm8hoUikmnOyAp_nNZVNjlI7Q0W1QavXnbvIVrW8-Y-OicVbTvKaPA3RhRFr1HdYuIovMh65P8PgC';
const PAYMENT_AMOUNT = 5050;
const PAYMENT_CURRENCY = 'GBP';
const PAYMENT_COUNTRY = 'GB';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

interface Gr4vyTransactionResult {
  sucess: boolean;
  transactionId: string;
  status: string;
  paymentMethodId?: string;
}

interface Gr4vyPaymentMethod {
  id: number;
  method: string;
  mode: string;
}

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onPaymentMethodSelected = (paymentMethod: Gr4vyPaymentMethod) => {
    console.log('onPaymentMethodSelected', paymentMethod);
  };

  const startPayment = () => {
    const onPaymentMethodSelectedSubscription =
      Gr4vyPaymentsEventEmitter.addListener(
        'onPaymentMethodSelected',
        onPaymentMethodSelected,
      );

    Gr4vyPayments.showPaymentSheet(
      'spider',
      GR4VY_TOKEN,
      PAYMENT_AMOUNT,
      PAYMENT_CURRENCY,
      PAYMENT_COUNTRY,
      null,
      GR4VY_ENV,
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

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
