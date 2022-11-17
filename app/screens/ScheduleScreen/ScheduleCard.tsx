import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { Avatar, Card, Icon, Text } from "../../components"
import { colors, spacing } from "../../theme"

const Header = ({ time, title }) => (
  <View style={$headerContainer}>
    <Text style={$timeText}>{time}</Text>
    <Text preset="eventTitle" style={$titleText}>
      {title}
    </Text>
  </View>
)

const Footer = ({ heading, subheading }) => (
  <View style={$footerContainer}>
    <Text preset="heading" style={$footerHeading}>
      {heading}
    </Text>
    <Text style={$footerSubheading}>{subheading}</Text>
  </View>
)

export type Variants = "event" | "workshop" | "talk"

interface ScheduleCardProps {
  /**
   * The variant of the card.
   * Options: "event", "workshop", "talk"
   * Default: "event"
   */
  variant?: Variants
  /**
   * Optional onPress for a touchable card
   */
  onPress?: () => void
  /**
   * Start time or time range
   * 8:00 am
   * 6:00 - 8:00 am
   */
  time: string
  /**
   * The event title
   */
  eventTitle: string
  /**
   * Card bold heading
   */
  heading?: string
  /**
   * Card subheading beneath heading
   */
  subheading: string
}

const baseEventProps = (time: string, title: string) => ({
  HeadingComponent: <Header {...{ time, title }} />,
})

const baseSpeakingEventProps = (heading: string, subheading: string) => ({
  RightComponent: (
    <View style={$rightContainer}>
      <Avatar
        preset="talk"
        style={$avatar}
        source={{ uri: "https://avatars.githubusercontent.com/u/997157?v=4" }}
      />
      <Icon
        icon="arrow"
        size={24}
        color={colors.palette.primary500}
        containerStyle={$arrowContainer}
      />
    </View>
  ),
  FooterComponent: <Footer {...{ heading, subheading }} />,
})

const ScheduleCard: FC<ScheduleCardProps> = observer(function ScheduleCard(props) {
  const { variant = "event", onPress, time, eventTitle, heading, subheading } = props

  const cardProps = { ...baseEventProps(time, eventTitle) }
  const variantProps =
    variant === "event"
      ? { content: subheading, contentStyle: $contentText }
      : baseSpeakingEventProps(heading, subheading)

  return (
    <Card
      preset={variant === "event" ? "reversed" : "default"}
      {...{ ...cardProps, ...variantProps, onPress }}
    />
  )
})

const $avatar: ViewStyle = {
  position: "absolute",
  top: spacing.extraSmall,
  right: spacing.medium,
}

const $footerSubheading: TextStyle = {
  color: colors.palette.neutral900,
  lineHeight: 22.4,
}

const $timeText: TextStyle = {
  color: colors.palette.neutral900,
  marginBottom: spacing.large,
}

const $titleText: TextStyle = {
  color: colors.palette.primary500,
  textTransform: "uppercase",
}

const $contentText: TextStyle = {
  color: colors.palette.neutral500,
}

const $footerHeading: TextStyle = {
  color: colors.palette.neutral900,
  fontSize: 22,
  lineHeight: 24.2,
  marginBottom: spacing.extraSmall,
}

const $footerContainer: ViewStyle = {
  flex: 1,
  paddingTop: spacing.small,
}

const $rightContainer: ViewStyle = {
  position: "absolute",
  right: spacing.extraSmall,
  top: 0,
  bottom: 0,
  width: 50,
  marginRight: -spacing.medium,
}

const $arrowContainer: ViewStyle = {
  bottom: spacing.extraSmall,
  right: spacing.medium,
  position: "absolute",
}

const $headerContainer: ViewStyle = {
  marginBottom: spacing.small,
}

export default ScheduleCard
