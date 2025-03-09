import Stack from "@/components/ui/Stack";
import { useRouter } from "expo-router";
import { Button } from "react-native";

export default function Layout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="post"
        options={{
          presentation: "modal",
          headerTitle: "",
          headerLeft: () => (
            <Button title="Cancel" onPress={() => router.back()} />
          ),
        }}
      />
      <Stack.Screen
        name="notifications"
        options={{
          presentation: "modal",
          headerTitle: "Notifications",
        }}
      />

      <Stack.Screen
        name="account"
        options={{
          presentation: "card",
          headerTitle: "Account",
        }}
      />
    </Stack>
  );
}
