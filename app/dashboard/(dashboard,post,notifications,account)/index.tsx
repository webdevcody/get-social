import { getPosts } from "@/api/posts";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { Text } from "@/components/ui/Form";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Pressable, StyleSheet, View } from "react-native";
import { formatDistanceToNow } from "date-fns";
import { GetPostResponse } from "@/app/api/posts+api";
import { useRouter } from "expo-router";

export default function Page() {
  const { token } = useAuth();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(token),
  });

  return (
    <BodyScrollView style={styles.container}>
      {isLoading && <Text>Loading...</Text>}
      {posts?.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </BodyScrollView>
  );
}

function PostComponent({ post }: { post: GetPostResponse[number] }) {
  const router = useRouter();
  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <View style={styles.avatarPlaceholder} />
        <View>
          <Pressable
            onPress={() => router.push(`/dashboard/profile/${post.userId}`)}
          >
            <Text style={styles.displayName}>{post.profile.displayName}</Text>
          </Pressable>
          <Text style={styles.timestamp}>
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
            })}
          </Text>
        </View>
      </View>
      <Text style={styles.postText}>{post.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
  postContainer: {
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  displayName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E1E1E1",
    marginRight: 12,
  },
  timestamp: {
    color: "#666666",
    fontSize: 14,
  },
  postText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
