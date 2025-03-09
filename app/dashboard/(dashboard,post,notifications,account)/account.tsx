import { secureDelete } from "@/utils/storage";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Button,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import * as Form from "@/components/ui/Form";
import { IconSymbol } from "@/components/ui/IconSymbol";
import * as AC from "@bacons/apple-colors";
import { useQuery } from "@tanstack/react-query";
import { getMyProfile, updateProfile } from "@/api/profiles";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const { token } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getMyProfile(token),
  });

  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    setDisplayName(profile?.displayName ?? "");
  }, [profile]);

  async function handleUpdateProfile() {
    if (!displayName) {
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1400);

    await updateProfile(displayName, token).catch((error) => {
      console.error(error);
    });
  }

  return (
    <Form.List style={styles.container} navigationTitle="Settings">
      <Form.Section title="Profile">
        <Form.HStack>
          <IconSymbol color={AC.lightText} name="info" size={24} />
          {isLoadingProfile ? (
            <ActivityIndicator />
          ) : (
            <TextInput
              style={styles.input}
              value={displayName}
              onChangeText={setDisplayName}
            />
          )}
          {!isLoadingProfile && (
            <Pressable
              onPress={() => {
                handleUpdateProfile();
              }}
            >
              <IconSymbol
                color={isSaving ? AC.systemGreen : AC.lightText}
                name={isSaving ? "checkmark.circle" : "checkmark"}
                size={24}
              />
            </Pressable>
          )}
        </Form.HStack>
      </Form.Section>

      <Form.Section title="Security">
        <Form.HStack>
          <IconSymbol
            color={AC.systemRed}
            name="person.fill.badge.minus"
            size={24}
          />
          <Form.Text
            onPress={() => {
              secureDelete("token");
              router.replace("/");
            }}
          >
            Sign Out
          </Form.Text>
        </Form.HStack>
      </Form.Section>
    </Form.List>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 120,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    color: AC.lightText,
    borderColor: AC.lightText,
    borderRadius: 8,
    padding: 8,
  },
});
