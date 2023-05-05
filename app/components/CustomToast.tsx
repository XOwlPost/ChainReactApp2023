import React, { useLayoutEffect } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { colors, spacing } from "../theme"
import messaging from "@react-native-firebase/messaging"
import Toast, { BaseToast, ToastConfig } from "react-native-toast-message"
import { $baseSecondaryStyle, $baseStyle } from "./Text"
import { Dimensions, ViewStyle } from "react-native"

// Setting up our custom Toast component
export const CustomToast = () => {
  const insets = useSafeAreaInsets()

  useLayoutEffect(() => {
    // handle a new push notification received while the app is in "foreground" state
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (
        remoteMessage.notification &&
        (remoteMessage.notification.title || remoteMessage.notification.body)
      ) {
        Toast.show({
          text1: remoteMessage.notification.title,
          text2: remoteMessage.notification.body,
        })
      }
    })
    return unsubscribe
  })

  const toastConfig: ToastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        contentContainerStyle={$toastContainer}
        style={$toast}
        text1Style={$baseStyle}
        text2Style={$baseSecondaryStyle}
      />
    ),
  }

  return <Toast config={toastConfig} topOffset={insets.top} />
}

const $toast: ViewStyle = {
  backgroundColor: colors.palette.neutral400,
  borderLeftWidth: 0,
  borderRadius: spacing.extraSmall,
  width: Dimensions.get("window").width - spacing.extraSmall * 2,
}

const $toastContainer: ViewStyle = {
  paddingHorizontal: spacing.large,
  paddingVertical: spacing.medium,
}
