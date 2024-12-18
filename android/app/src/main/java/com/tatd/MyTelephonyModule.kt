package com.tatd.driver

import android.content.Context
import android.telephony.SubscriptionManager
import android.telephony.SubscriptionInfo
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class MyTelephonyModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "MyTelephonyModule"
    }

    @ReactMethod
    fun getSimInfo(promise: Promise) {
        try {
            val subscriptionManager = reactApplicationContext.getSystemService(Context.TELEPHONY_SUBSCRIPTION_SERVICE) as SubscriptionManager
            val subscriptionInfoList = subscriptionManager.activeSubscriptionInfoList

            val simInfo = StringBuilder()
            for (info in subscriptionInfoList) {
                val phoneNumber = info.number
                val simSlotIndex = info.simSlotIndex
                simInfo.append("SIM Slot: ").append(simSlotIndex).append(", Phone Number: ").append(phoneNumber).append("\n")
            }

            promise.resolve(simInfo.toString())
        } catch (e: Exception) {
            promise.reject("Error", e.message)
        }
    }
}
