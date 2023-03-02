#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(Gr4vyPayments, NSObject)

RCT_EXTERN_METHOD(
  showPaymentSheet:(NSString *)gr4vyId
    token:(NSString *)token
    amount:(double)amount
    currency:(NSString *)currency
    country:(NSString *)country
    buyerId:(NSString *)buyerId
    environment:(NSString *)environment
    errorCallback:(RCTResponseSenderBlock)errorCallback
    successCallback:(RCTResponseSenderBlock)successCallback)
@end
  
@interface RCT_EXTERN_MODULE(RNGr4vyEvents, RCTEventEmitter)
  RCT_EXTERN_METHOD(supportedEvents)
@end
