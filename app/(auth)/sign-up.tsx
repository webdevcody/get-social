import { AppButton } from "@/components/ui/AppButton";
import { Text } from "@/components/ui/Form";
import { secureSave } from "@/utils/storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignUp() {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    fetch("/api/sign-up", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        await secureSave("token", data.token);
        router.push("/dashboard");
        setPassword("");
        setEmail("");
      } else {
        alert("something went wrong");
      }
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            autoCapitalize="none"
            value={email}
            style={styles.input}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            style={styles.input}
            autoCapitalize="none"
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <AppButton onPress={handleSignUp}>Sign Up</AppButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#15152F",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  field: {
    gap: 12,
  },
  label: {
    fontSize: 16,
    textAlign: "left",
  },
  form: {
    gap: 24,
    width: "80%",
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: "#000000",
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
});
