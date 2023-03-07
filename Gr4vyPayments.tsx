import {NativeModules, NativeEventEmitter} from 'react-native';

const {RNGr4vyPayments, RNGr4vyEvents} = NativeModules;

export interface Gr4vyTransactionResult {
  sucess: boolean;
  transactionId: string;
  status: string;
  paymentMethodId?: string;
}

export interface Gr4vyPaymentMethod {
  id: number;
  method: string;
  mode: string;
}

export const Gr4vyPaymentsEventEmitter = new NativeEventEmitter(RNGr4vyEvents);

interface Gr4vyInterface {
  showPaymentSheet(
    gr4vId: string,
    token: string,
    amount: number,
    currency: string,
    country: string,
    paymentMethodId?: string | null,
    environment?: string | null,
    onError?: (error: string) => void,
    onTransaction?: (transaction: Gr4vyTransactionResult) => void,
  ): void;
}

export default RNGr4vyPayments as Gr4vyInterface;
