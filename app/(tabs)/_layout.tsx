import { Tabs } from "expo-router";
import { Platform, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

export default function TabLayout() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { width: windowWidth } = useWindowDimensions();
  const isDesktopWeb = Platform.OS === "web" && windowWidth >= 900;
  const bottomPadding = Platform.OS === "web" ? 10 : Math.max(insets.bottom, 8);
  const tabBarHeight = 61 + bottomPadding;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarButton: HapticTab,
        tabBarLabelStyle: {
          fontSize: isDesktopWeb ? 11 : 10,
          fontWeight: "700",
          marginTop: 2,
          textAlign: isDesktopWeb ? "left" : "center",
        },
        tabBarItemStyle: isDesktopWeb
          ? { minHeight: 48, alignItems: "flex-start", justifyContent: "center", paddingHorizontal: 20 }
          : undefined,
        tabBarStyle: isDesktopWeb
          ? {
              display: "none",
            }
          : {
              height: tabBarHeight,
              paddingTop: 8,
              paddingBottom: bottomPadding,
              backgroundColor: colors.surface,
              borderTopColor: colors.border,
              borderTopWidth: 1,
            },
        tabBarIconStyle: isDesktopWeb ? { marginRight: 12 } : undefined,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Overview", tabBarIcon: ({ color }) => <IconSymbol name="house.fill" size={22} color={color} /> }} />
      <Tabs.Screen name="queue" options={{ title: "Recovery queue", tabBarIcon: ({ color }) => <IconSymbol name="arrow.triangle.2.circlepath" size={22} color={color} /> }} />
      <Tabs.Screen name="leads" options={{ title: "All leads", tabBarIcon: ({ color }) => <IconSymbol name="person.2.fill" size={22} color={color} /> }} />
      <Tabs.Screen name="conversations" options={{ title: "Conversations", tabBarIcon: ({ color }) => <IconSymbol name="bubble.left.and.bubble.right.fill" size={22} color={color} /> }} />
      <Tabs.Screen name="more" options={{ title: "More tools", tabBarIcon: ({ color }) => <IconSymbol name="ellipsis.circle.fill" size={22} color={color} /> }} />
    </Tabs>
  );
}
