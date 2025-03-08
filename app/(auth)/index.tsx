import { AppButton } from "@/components/ui/AppButton";
import { Text } from "@/components/ui/Form";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";

export default function Page() {
  const router = useRouter();

  const { isLoggedIn, isLoading } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard/(dashboard)");
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/splash.jpeg")}
        style={styles.logo}
      />

      <Text style={styles.title}>Let's GetSocial</Text>

      <AppButton onPress={() => router.push("/sign-in")}>Sign In</AppButton>
      <AppButton
        style={styles.signUpButton}
        onPress={() => router.push("/sign-up")}
      >
        Sign Up
      </AppButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E1E2F",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  logo: {
    width: 240,
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  signUpButton: {
    backgroundColor: "gray",
  },
});
