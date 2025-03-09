import { secureDelete } from "@/utils/storage";
import { useRouter } from "expo-router";
import { Button, StyleSheet, View } from "react-native";

export default function Page() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Button
        title="Logout"
        onPress={() => {
          secureDelete("token");
          router.replace("/");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
  },
});
