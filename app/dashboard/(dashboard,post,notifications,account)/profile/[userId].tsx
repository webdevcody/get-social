import { getProfile } from "@/api/profiles";
import { getUserPosts } from "@/api/users";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Skeleton from "@/components/ui/Skeleton";
import { Post } from "@/db/schema";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { useGlobalSearchParams } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ProfileScreen() {
  const { token } = useAuth();
  const glob = useGlobalSearchParams();
  const userId = glob.userId as string;

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getProfile(userId, token),
  });

  const { data: posts, isLoading: isPostsLoading } = useQuery({
    queryKey: ["posts", userId],
    queryFn: () => getUserPosts(userId, token),
  });

  return (
    <BodyScrollView>
      <View style={styles.headerContainer}>
        <View style={styles.avatar}></View>
        {isProfileLoading ? (
          <Skeleton style={styles.displayNameSkeleton} />
        ) : (
          <Text style={styles.text}>{profile?.displayName}</Text>
        )}
      </View>

      <View style={styles.followerContainer}>
        <Text style={styles.followerText}>{posts?.length} Posts</Text>
        <Text style={styles.followerText}>0 Followers</Text>
        <Text style={styles.followerText}>0 Following</Text>
      </View>

      <View style={styles.postsContainer}>
        {isPostsLoading ? (
          <React.Fragment>
            <Skeleton style={styles.postSkeleton} />
            <Skeleton style={styles.postSkeleton} />
            <Skeleton style={styles.postSkeleton} />
            <Skeleton style={styles.postSkeleton} />
            <Skeleton style={styles.postSkeleton} />
          </React.Fragment>
        ) : (
          posts?.map((post) => <PostComponent key={post.id} post={post} />)
        )}
      </View>
    </BodyScrollView>
  );
}

function PostComponent({ post }: { post: Post }) {
  return (
    <View style={styles.post}>
      <Text style={styles.postText}>{post.text}</Text>
      <Text style={styles.timestamp}>
        {formatDistanceToNow(new Date(post.createdAt), {
          addSuffix: true,
        })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 18,
    marginBottom: 24,
  },
  postSkeleton: {
    width: "100%",
    height: 100,
    borderRadius: 8,
  },
  displayNameSkeleton: {
    width: 220,
    height: 35,
    borderRadius: 8,
  },
  followerText: {
    color: "white",
    fontSize: 20,
  },
  followerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  postsContainer: {
    gap: 12,
  },
  post: {
    width: "100%",
    backgroundColor: "#111",
    padding: 20,
    borderRadius: 8,
    gap: 8,
  },
  postText: {
    color: "white",
    fontSize: 22,
  },
  timestamp: {
    fontSize: 16,
    color: "gray",
  },
  text: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "white",
  },
});
