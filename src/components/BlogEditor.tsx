import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  CalendarIcon,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Image,
  Link,
  Undo,
  Redo,
  Code,
  Save,
  Eye,
  Upload,
  Settings,
  Plus,
  X,
  Box,
} from "lucide-react";

interface BlogEditorProps {
  initialContent?: string;
  onSave?: (content: BlogPost) => void;
}

interface BlogPost {
  title: string;
  content: string;
  coverImage: string;
  tags: string[];
  publishDate: Date | undefined;
  isDraft: boolean;
  models: Model3D[];
}

interface Model3D {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
}

const BlogEditor = ({ initialContent = "", onSave }: BlogEditorProps) => {
  const [activeTab, setActiveTab] = useState("write");
  const [date, setDate] = useState<Date>();
  const [blogPost, setBlogPost] = useState<BlogPost>({
    title: "Untitled Blog Post",
    content: initialContent,
    coverImage: "",
    tags: [],
    publishDate: undefined,
    isDraft: true,
    models: [],
  });
  const [newTag, setNewTag] = useState("");

  // Mock 3D models that would normally come from a user's library
  const availableModels: Model3D[] = [
    {
      id: "1",
      name: "Robot Character",
      url: "/models/robot.glb",
      thumbnail:
        "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400&q=80",
    },
    {
      id: "2",
      name: "Sci-Fi Environment",
      url: "/models/environment.glb",
      thumbnail:
        "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=400&q=80",
    },
    {
      id: "3",
      name: "Fantasy Weapon",
      url: "/models/weapon.glb",
      thumbnail:
        "https://images.unsplash.com/photo-1599834562135-b6fc90e642ca?w=400&q=80",
    },
  ];

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlogPost({ ...blogPost, title: e.target.value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBlogPost({ ...blogPost, content: e.target.value });
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlogPost({ ...blogPost, coverImage: e.target.value });
  };

  const handleAddTag = () => {
    if (newTag && !blogPost.tags.includes(newTag)) {
      setBlogPost({ ...blogPost, tags: [...blogPost.tags, newTag] });
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setBlogPost({ ...blogPost, tags: blogPost.tags.filter((t) => t !== tag) });
  };

  const handleDraftToggle = (checked: boolean) => {
    setBlogPost({ ...blogPost, isDraft: !checked });
  };

  const handleDateChange = (date: Date | undefined) => {
    setDate(date);
    setBlogPost({ ...blogPost, publishDate: date });
  };

  const handleAddModel = (model: Model3D) => {
    if (!blogPost.models.some((m) => m.id === model.id)) {
      setBlogPost({ ...blogPost, models: [...blogPost.models, model] });
    }
  };

  const handleRemoveModel = (modelId: string) => {
    setBlogPost({
      ...blogPost,
      models: blogPost.models.filter((m) => m.id !== modelId),
    });
  };

  const handleSave = () => {
    if (onSave) {
      onSave(blogPost);
    }
    // In a real app, this would save to a database
    console.log("Saving blog post:", blogPost);
  };

  return (
    <div className="bg-background w-full h-full flex flex-col">
      <div className="border-b p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Input
            value={blogPost.title}
            onChange={handleTitleChange}
            className="text-xl font-bold border-none w-[300px] focus-visible:ring-0"
            placeholder="Enter post title..."
          />
          {blogPost.isDraft ? (
            <Badge variant="outline">Draft</Badge>
          ) : (
            <Badge variant="secondary">Ready to Publish</Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveTab("preview")}
          >
            <Eye className="h-4 w-4 mr-2" /> Preview
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="h-4 w-4 mr-2" /> Settings
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" /> Save
          </Button>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col"
      >
        <div className="border-b px-4">
          <TabsList>
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="write" className="h-full flex">
            <div className="flex-1 p-4 flex flex-col">
              <div className="bg-muted/30 p-2 rounded-md mb-4 flex gap-2 overflow-x-auto">
                <Button variant="ghost" size="sm">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Underline className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" className="mx-1" />
                <Button variant="ghost" size="sm">
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <AlignRight className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" className="mx-1" />
                <Button variant="ghost" size="sm">
                  <List className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ListOrdered className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" className="mx-1" />
                <Button variant="ghost" size="sm">
                  <Image className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Link className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Box className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Code className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" className="mx-1" />
                <Button variant="ghost" size="sm">
                  <Undo className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Redo className="h-4 w-4" />
                </Button>
              </div>

              <Textarea
                value={blogPost.content}
                onChange={handleContentChange}
                placeholder="Start writing your blog post here..."
                className="flex-1 resize-none text-base leading-relaxed"
              />
            </div>

            <div className="w-[300px] border-l p-4 overflow-y-auto">
              <h3 className="font-medium mb-4">3D Models</h3>

              <div className="space-y-4">
                {blogPost.models.length > 0 ? (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Added Models
                    </h4>
                    {blogPost.models.map((model) => (
                      <div
                        key={model.id}
                        className="flex items-center gap-2 border rounded-md p-2"
                      >
                        <img
                          src={model.thumbnail}
                          alt={model.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{model.name}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveModel(model.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No models added yet
                  </p>
                )}

                <Separator />

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Available Models
                  </h4>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-2">
                      {availableModels.map((model) => (
                        <div
                          key={model.id}
                          className="flex items-center gap-2 border rounded-md p-2"
                        >
                          <img
                            src={model.thumbnail}
                            alt={model.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{model.name}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAddModel(model)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    <Upload className="h-4 w-4 mr-2" /> Upload New Model
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="h-full p-4 overflow-auto">
            <Card className="max-w-4xl mx-auto">
              {blogPost.coverImage && (
                <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                  <img
                    src={
                      blogPost.coverImage ||
                      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80"
                    }
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-3xl">{blogPost.title}</CardTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  {blogPost.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {blogPost.content.split("\n").map((paragraph, i) => (
                    <p key={i} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {blogPost.models.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">3D Models</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {blogPost.models.map((model) => (
                        <div
                          key={model.id}
                          className="border rounded-md overflow-hidden"
                        >
                          <div className="aspect-square bg-muted relative">
                            <img
                              src={model.thumbnail}
                              alt={model.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                              <Button variant="secondary" size="sm">
                                <Box className="h-4 w-4 mr-2" /> View Model
                              </Button>
                            </div>
                          </div>
                          <div className="p-3">
                            <h4 className="font-medium">{model.name}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="h-full p-4 overflow-auto">
            <div className="max-w-2xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Blog Post Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cover-image">Cover Image URL</Label>
                    <Input
                      id="cover-image"
                      placeholder="https://example.com/image.jpg"
                      value={blogPost.coverImage}
                      onChange={handleCoverImageChange}
                    />
                    {blogPost.coverImage && (
                      <div className="aspect-video w-full overflow-hidden rounded-md mt-2">
                        <img
                          src={blogPost.coverImage}
                          alt="Cover preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                              "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80";
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {blogPost.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {tag}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => handleRemoveTag(tag)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                      />
                      <Button onClick={handleAddTag}>Add</Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Publishing</Label>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="publish-toggle">Ready to publish</Label>
                        <p className="text-sm text-muted-foreground">
                          {blogPost.isDraft
                            ? "Currently saved as draft"
                            : "Will be published on schedule"}
                        </p>
                      </div>
                      <Switch
                        id="publish-toggle"
                        checked={!blogPost.isDraft}
                        onCheckedChange={handleDraftToggle}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Publish Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={handleDateChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>SEO Settings</Label>
                    <Select defaultValue="default">
                      <SelectTrigger>
                        <SelectValue placeholder="Select SEO visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">
                          Default visibility
                        </SelectItem>
                        <SelectItem value="public">
                          Public - Index this post
                        </SelectItem>
                        <SelectItem value="noindex">
                          Private - Don't index
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default BlogEditor;
