import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  PlusCircle,
  Settings,
  BarChart3,
  Eye,
  Edit,
  Trash2,
  Globe,
  ArrowUpRight,
} from "lucide-react";

interface Website {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  status: "published" | "draft";
  views: number;
  lastUpdated: string;
}

interface DashboardProps {
  username?: string;
  websites?: Website[];
}

const Dashboard = ({
  username = "3DArtist",
  websites = [
    {
      id: "1",
      title: "My 3D Portfolio",
      description: "Showcase of my best 3D character models and environments",
      thumbnail:
        "https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=600&q=80",
      status: "published" as const,
      views: 1243,
      lastUpdated: "2023-10-15",
    },
    {
      id: "2",
      title: "Sci-Fi Concepts",
      description: "Process blog for my latest sci-fi environment project",
      thumbnail:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
      status: "draft" as const,
      views: 0,
      lastUpdated: "2023-10-20",
    },
    {
      id: "3",
      title: "Character Design Blog",
      description: "Step-by-step process for creating game-ready characters",
      thumbnail:
        "https://images.unsplash.com/photo-1633957897986-70e83293f3ff?w=600&q=80",
      status: "published" as const,
      views: 856,
      lastUpdated: "2023-10-10",
    },
  ],
}) => {
  const [activeTab, setActiveTab] = useState("websites");

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-primary text-primary-foreground p-2 rounded-md">
            <Globe className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold">3D Portfolio</h1>
        </div>

        <div className="space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setActiveTab("websites")}
          >
            <Globe className="mr-2 h-4 w-4" />
            My Websites
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setActiveTab("analytics")}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>

        <div className="mt-auto pt-4 border-t">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=artist" />
              <AvatarFallback>
                {username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{username}</p>
              <p className="text-xs text-muted-foreground">Pro Account</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your 3D portfolio websites
              </p>
            </div>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Website
            </Button>
          </div>

          <TabsList className="mb-6">
            <TabsTrigger value="websites">My Websites</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="websites" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Create New Website Card */}
              <Card className="border-dashed bg-muted/40 flex flex-col items-center justify-center h-[320px]">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="rounded-full bg-background p-3 mb-4">
                    <PlusCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">
                    Create New Website
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Start building your 3D portfolio or blog
                  </p>
                  <Button>Get Started</Button>
                </CardContent>
              </Card>

              {/* Website Cards */}
              {websites.map((website) => (
                <Card
                  key={website.id}
                  className="overflow-hidden h-[320px] flex flex-col"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={website.thumbnail}
                      alt={website.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge
                        variant={
                          website.status === "published" ? "default" : "outline"
                        }
                      >
                        {website.status === "published" ? "Published" : "Draft"}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle>{website.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {website.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pb-2 pt-0">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Eye className="h-4 w-4 mr-1" />
                      <span>{website.views} views</span>
                      <span className="mx-2">•</span>
                      <span>Updated {website.lastUpdated}</span>
                    </div>
                  </CardContent>

                  <CardFooter className="mt-auto pt-2">
                    <div className="flex gap-2 w-full">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" /> Preview
                      </Button>
                      <Button variant="ghost" size="sm" className="px-2">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Website Performance</CardTitle>
                <CardDescription>
                  View analytics for all your websites
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {websites
                    .filter((website) => website.status === "published")
                    .map((website) => (
                      <div key={website.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded overflow-hidden">
                              <img
                                src={website.thumbnail}
                                alt={website.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="font-medium">{website.title}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              {website.views} views
                            </span>
                            <Button variant="ghost" size="sm">
                              <ArrowUpRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <Progress value={website.views / 20} className="h-2" />
                        <Separator className="mt-4" />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Profile</h3>
                    <p className="text-sm text-muted-foreground">
                      Update your personal information
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-medium">Subscription</h3>
                    <p className="text-sm text-muted-foreground">
                      You are currently on the Pro plan
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-medium">Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure how you receive updates
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
