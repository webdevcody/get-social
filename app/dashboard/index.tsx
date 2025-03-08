import { Text } from "@/components/ui/Form";
import { secureGet } from "@/utils/storage";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function Page() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      const token = await secureGet("token");
      setToken(token || "");
    };
    fetchToken();
  }, []);

  return (
    <View>
      <Text>Dashboard {token}</Text>
    </View>
  );
}
