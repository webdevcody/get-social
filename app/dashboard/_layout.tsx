import Tabs from "@/components/ui/Tabs";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        options={{
          href: "/dashboard",
        }}
        name="(dashboard)"
        title="Feed"
        systemImage="house.fill"
      />

      <Tabs.Screen
        options={{
          href: "/dashboard/post",
        }}
        name="(post)"
        title="Post"
        systemImage="plus"
      />

      <Tabs.Screen
        options={{
          href: "/dashboard/notifications",
        }}
        name="(notifications)"
        title="Notifications"
        systemImage="bell.fill"
      />

      <Tabs.Screen
        options={{
          href: "/dashboard/account",
        }}
        name="(account)"
        title="Settings"
        systemImage="gearshape.fill"
      />
    </Tabs>
  );
}
