import { createPost } from "@/api/posts";
import { AppButton } from "@/components/ui/AppButton";
import { Text } from "@/components/ui/Form";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function Page() {
  const [text, setText] = useState("");
  const router = useRouter();
  const { token } = useAuth();
  const clientQuery = useQueryClient();

  function handlePost() {
    createPost(text, token)
      .then((post) => {
        clientQuery.invalidateQueries({ queryKey: ["posts"] });
        router.back();
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>What do you want to say?</Text>
        <TextInput
          autoCapitalize="none"
          value={text}
          style={styles.input}
          onChangeText={setText}
          multiline
        />
      </View>

      <AppButton style={styles.postButton} onPress={handlePost}>
        Post
      </AppButton>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    textAlign: "left",
  },
  field: {
    gap: 12,
  },
  container: {
    marginTop: 66,
    paddingHorizontal: 24,
    gap: 12,
  },
  postButton: {
    width: "100%",
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: "#000000",
    borderWidth: 1,
    height: 100,
    borderColor: "#CCCCCC",
  },
});
