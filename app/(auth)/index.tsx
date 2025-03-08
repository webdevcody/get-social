import { Text } from "@/components/ui/Form";
import { useRouter } from "expo-router";
import { Button, Image, Pressable, StyleSheet, View } from "react-native";

export default function Page() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/splash.jpeg")}
        style={styles.logo}
      />

      <Text style={styles.title}>Let's GetSocial</Text>

      <Pressable
        style={styles.signInButton}
        onPress={() => router.push("/sign-in")}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
      <Pressable
        style={styles.signUpButton}
        onPress={() => router.push("/sign-up")}
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
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
  signInButton: {
    padding: 12,
    borderRadius: 8,
    width: 140,
    backgroundColor: "#4A90E2",
  },
  signUpButton: {
    padding: 12,
    borderRadius: 8,
    width: 140,
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
