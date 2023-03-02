//
//  RNGr4vyEvents.swift
//  Gr4vyReactNative
//
//  Created by Paul Levetsky on 02/03/2023.
//

import Foundation

@objc(RNGr4vyEvents)
open class RNGr4vyEvents: RCTEventEmitter {

  public static var emitter: RCTEventEmitter!

  override init() {
    super.init()
    RNGr4vyEvents.emitter = self
  }

  @objc override public static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  open override func supportedEvents() -> [String] {
    ["onPaymentMethodSelected"]
  }
}
