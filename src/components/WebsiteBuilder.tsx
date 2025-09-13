import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  ChevronDown,
  ChevronRight,
  Eye,
  Grid,
  Image,
  Layout,
  Layers,
  LayoutGrid,
  Menu,
  Move,
  Plus,
  Save,
  Settings,
  Text,
  Type,
  Upload,
} from "lucide-react";

interface ComponentItem {
  id: string;
  type: string;
  name: string;
  icon: React.ReactNode;
}

interface Template {
  id: string;
  name: string;
  thumbnail: string;
  category: string;
}

const WebsiteBuilder = () => {
  const [activeTab, setActiveTab] = useState("canvas");
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [showTemplateSelector, setShowTemplateSelector] = useState(true);

  // Mock data for components
  const componentItems: ComponentItem[] = [
    {
      id: "1",
      type: "3d-model",
      name: "3D Model Viewer",
      icon: <Layers size={18} />,
    },
    {
      id: "2",
      type: "gallery",
      name: "Gallery Grid",
      icon: <Grid size={18} />,
    },
    { id: "3", type: "blog-post", name: "Blog Post", icon: <Type size={18} /> },
    { id: "4", type: "header", name: "Header", icon: <Layout size={18} /> },
    { id: "5", type: "image", name: "Image", icon: <Image size={18} /> },
    { id: "6", type: "text", name: "Text Block", icon: <Text size={18} /> },
    {
      id: "7",
      type: "contact",
      name: "Contact Form",
      icon: <Menu size={18} />,
    },
  ];

  // Mock data for templates
  const templates: Template[] = [
    {
      id: "t1",
      name: "Portfolio Minimal",
      thumbnail:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
      category: "portfolio",
    },
    {
      id: "t2",
      name: "Artist Blog",
      thumbnail:
        "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&q=80",
      category: "blog",
    },
    {
      id: "t3",
      name: "Gallery Showcase",
      thumbnail:
        "https://images.unsplash.com/photo-1618005198784-bbdbad95659b?w=400&q=80",
      category: "gallery",
    },
    {
      id: "t4",
      name: "Process Journal",
      thumbnail:
        "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=400&q=80",
      category: "blog",
    },
    {
      id: "t5",
      name: "Model Store",
      thumbnail:
        "https://images.unsplash.com/photo-1618556658171-fc1d0a8cf5e5?w=400&q=80",
      category: "store",
    },
    {
      id: "t6",
      name: "Studio Portfolio",
      thumbnail:
        "https://images.unsplash.com/photo-1618556658044-3df9f7d2f0d9?w=400&q=80",
      category: "portfolio",
    },
  ];

  const handleSelectTemplate = (templateId: string) => {
    // In a real app, this would load the template
    console.log(`Selected template: ${templateId}`);
    setShowTemplateSelector(false);
  };

  const handleDragStart = (e: React.DragEvent, componentId: string) => {
    e.dataTransfer.setData("componentId", componentId);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const componentId = e.dataTransfer.getData("componentId");
    console.log(`Dropped component: ${componentId}`);
    // In a real app, this would add the component to the canvas
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleElementSelect = (elementId: string) => {
    setSelectedElement(elementId);
    setActiveTab("properties");
  };

  const handlePreview = () => {
    console.log("Preview website");
    // In a real app, this would show a preview of the website
  };

  const handlePublish = () => {
    console.log("Publish website");
    // In a real app, this would publish the website
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Top Navigation */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-bold">Website Builder</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Save size={16} className="mr-2" /> Save
            </Button>
            <Button variant="outline" size="sm" onClick={handlePreview}>
              <Eye size={16} className="mr-2" /> Preview
            </Button>
          </div>
        </div>
        <div className="flex space-x-2">
          <Select defaultValue="desktop">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Device" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desktop">Desktop</SelectItem>
              <SelectItem value="tablet">Tablet</SelectItem>
              <SelectItem value="mobile">Mobile</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handlePublish}>Publish</Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-64 border-r bg-muted/20 flex flex-col">
          <Tabs defaultValue="components" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="components">Components</TabsTrigger>
              <TabsTrigger value="layers">Layers</TabsTrigger>
            </TabsList>
            <TabsContent value="components" className="p-0">
              <ScrollArea className="h-[calc(100vh-160px)]">
                <div className="p-4 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">3D Elements</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {componentItems
                        .filter((item) => ["3d-model"].includes(item.type))
                        .map((item) => (
                          <div
                            key={item.id}
                            className="flex flex-col items-center justify-center p-3 border rounded-md cursor-move hover:bg-accent hover:text-accent-foreground"
                            draggable
                            onDragStart={(e) => handleDragStart(e, item.id)}
                          >
                            {item.icon}
                            <span className="mt-1 text-xs">{item.name}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Content</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {componentItems
                        .filter((item) =>
                          ["gallery", "blog-post", "text", "image"].includes(
                            item.type,
                          ),
                        )
                        .map((item) => (
                          <div
                            key={item.id}
                            className="flex flex-col items-center justify-center p-3 border rounded-md cursor-move hover:bg-accent hover:text-accent-foreground"
                            draggable
                            onDragStart={(e) => handleDragStart(e, item.id)}
                          >
                            {item.icon}
                            <span className="mt-1 text-xs">{item.name}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Layout</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {componentItems
                        .filter((item) =>
                          ["header", "contact"].includes(item.type),
                        )
                        .map((item) => (
                          <div
                            key={item.id}
                            className="flex flex-col items-center justify-center p-3 border rounded-md cursor-move hover:bg-accent hover:text-accent-foreground"
                            draggable
                            onDragStart={(e) => handleDragStart(e, item.id)}
                          >
                            {item.icon}
                            <span className="mt-1 text-xs">{item.name}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="layers" className="p-0">
              <ScrollArea className="h-[calc(100vh-160px)]">
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span>Layers</span>
                    <Button variant="ghost" size="sm">
                      <Plus size={16} />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <div
                      className={`flex items-center p-2 rounded-md cursor-pointer ${selectedElement === "header" ? "bg-accent text-accent-foreground" : "hover:bg-muted"}`}
                      onClick={() => handleElementSelect("header")}
                    >
                      <ChevronRight size={16} className="mr-1" />
                      <Layout size={14} className="mr-2" />
                      <span className="text-sm">Header</span>
                    </div>
                    <div
                      className={`flex items-center p-2 rounded-md cursor-pointer ${selectedElement === "hero" ? "bg-accent text-accent-foreground" : "hover:bg-muted"}`}
                      onClick={() => handleElementSelect("hero")}
                    >
                      <ChevronRight size={16} className="mr-1" />
                      <LayoutGrid size={14} className="mr-2" />
                      <span className="text-sm">Hero Section</span>
                    </div>
                    <div
                      className={`flex items-center p-2 rounded-md cursor-pointer ${selectedElement === "gallery" ? "bg-accent text-accent-foreground" : "hover:bg-muted"}`}
                      onClick={() => handleElementSelect("gallery")}
                    >
                      <ChevronRight size={16} className="mr-1" />
                      <Grid size={14} className="mr-2" />
                      <span className="text-sm">Gallery Grid</span>
                    </div>
                    <div
                      className={`flex items-center p-2 rounded-md cursor-pointer ${selectedElement === "3dmodel" ? "bg-accent text-accent-foreground" : "hover:bg-muted"}`}
                      onClick={() => handleElementSelect("3dmodel")}
                    >
                      <ChevronRight size={16} className="mr-1" />
                      <Layers size={14} className="mr-2" />
                      <span className="text-sm">3D Model Viewer</span>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 overflow-auto bg-muted/10">
          {showTemplateSelector ? (
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">Choose a Template</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className="overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                    onClick={() => handleSelectTemplate(template.id)}
                  >
                    <div className="aspect-video relative">
                      <img
                        src={template.thumbnail}
                        alt={template.name}
                        className="object-cover w-full h-full"
                      />
                      <Badge className="absolute top-2 right-2">
                        {template.category}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium">{template.name}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  onClick={() => setShowTemplateSelector(false)}
                >
                  Start from Scratch
                </Button>
              </div>
            </div>
          ) : (
            <div
              className="h-full p-8 flex items-center justify-center border-2 border-dashed border-muted-foreground/20"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="text-center">
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-muted">
                  <Move size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">
                  Drag and Drop Components Here
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Drag components from the sidebar to build your website
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-72 border-l bg-muted/20">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="properties" className="p-0">
              <ScrollArea className="h-[calc(100vh-160px)]">
                {selectedElement ? (
                  <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">
                        {selectedElement === "3dmodel"
                          ? "3D Model Viewer"
                          : selectedElement.charAt(0).toUpperCase() +
                            selectedElement.slice(1)}
                      </h3>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Settings size={14} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Advanced Settings</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    {selectedElement === "3dmodel" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="model-upload">3D Model</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              id="model-upload"
                              type="file"
                              className="flex-1"
                            />
                            <Button variant="outline" size="sm">
                              <Upload size={14} />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Supported formats: GLB, GLTF, OBJ, FBX
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label>Background</Label>
                          <div className="grid grid-cols-4 gap-2">
                            <div className="w-8 h-8 rounded-md bg-black cursor-pointer" />
                            <div className="w-8 h-8 rounded-md bg-white border cursor-pointer" />
                            <div className="w-8 h-8 rounded-md bg-gray-200 cursor-pointer" />
                            <div className="w-8 h-8 rounded-md bg-transparent border border-dashed cursor-pointer" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="rotation">Auto Rotation</Label>
                            <Switch id="rotation" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="zoom">Zoom Controls</Label>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs">Min</span>
                            <Slider
                              defaultValue={[0.5]}
                              max={1}
                              step={0.1}
                              className="flex-1"
                            />
                            <span className="text-xs">Max</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedElement === "gallery" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Layout</Label>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="p-2 border rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground">
                              <div className="grid grid-cols-2 gap-1">
                                <div className="bg-muted aspect-square rounded-sm" />
                                <div className="bg-muted aspect-square rounded-sm" />
                                <div className="bg-muted aspect-square rounded-sm" />
                                <div className="bg-muted aspect-square rounded-sm" />
                              </div>
                              <p className="text-xs text-center mt-1">Grid</p>
                            </div>
                            <div className="p-2 border rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground">
                              <div className="flex flex-col gap-1">
                                <div className="bg-muted aspect-[3/1] rounded-sm" />
                                <div className="bg-muted aspect-[3/1] rounded-sm" />
                                <div className="bg-muted aspect-[3/1] rounded-sm" />
                              </div>
                              <p className="text-xs text-center mt-1">List</p>
                            </div>
                            <div className="p-2 border rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground">
                              <div className="grid grid-cols-3 gap-1">
                                <div className="bg-muted aspect-square rounded-sm" />
                                <div className="bg-muted aspect-square rounded-sm" />
                                <div className="bg-muted aspect-square rounded-sm" />
                              </div>
                              <p className="text-xs text-center mt-1">
                                Masonry
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="gallery-items">Gallery Items</Label>
                          <div className="border rounded-md p-2 space-y-2">
                            <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-muted rounded-sm mr-2" />
                                <span className="text-xs">image-01.jpg</span>
                              </div>
                              <Button variant="ghost" size="sm">
                                <ChevronDown size={14} />
                              </Button>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-muted rounded-sm mr-2" />
                                <span className="text-xs">image-02.jpg</span>
                              </div>
                              <Button variant="ghost" size="sm">
                                <ChevronDown size={14} />
                              </Button>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                            >
                              <Plus size={14} className="mr-1" /> Add Item
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {(selectedElement === "header" ||
                      selectedElement === "hero") && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            defaultValue={
                              selectedElement === "header"
                                ? "My Portfolio"
                                : "Welcome to My 3D Art Portfolio"
                            }
                          />
                        </div>

                        {selectedElement === "hero" && (
                          <div className="space-y-2">
                            <Label htmlFor="subtitle">Subtitle</Label>
                            <Input
                              id="subtitle"
                              defaultValue="Explore my latest 3D creations and projects"
                            />
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label>Background</Label>
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-md bg-primary cursor-pointer" />
                            <Input
                              type="text"
                              defaultValue="#000000"
                              className="flex-1"
                            />
                            <Button variant="outline" size="sm">
                              <Image size={14} />
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="sticky">Sticky Header</Label>
                            <Switch
                              id="sticky"
                              defaultChecked={selectedElement === "header"}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full p-4 text-center">
                    <div>
                      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-muted">
                        <ChevronRight
                          size={20}
                          className="text-muted-foreground"
                        />
                      </div>
                      <h3 className="text-sm font-medium">
                        No Element Selected
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Select an element to edit its properties
                      </p>
                    </div>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="settings" className="p-0">
              <ScrollArea className="h-[calc(100vh-160px)]">
                <div className="p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="site-title">Site Title</Label>
                    <Input id="site-title" defaultValue="My 3D Portfolio" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="site-description">Site Description</Label>
                    <Input
                      id="site-description"
                      defaultValue="A showcase of my 3D artwork and projects"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="favicon">Favicon</Label>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-muted rounded-md flex items-center justify-center">
                        <Image size={14} />
                      </div>
                      <Input id="favicon" type="file" className="flex-1" />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="border p-2 rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground">
                        <div className="h-12 bg-white border mb-2 rounded-sm" />
                        <p className="text-xs text-center">Light</p>
                      </div>
                      <div className="border p-2 rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground">
                        <div className="h-12 bg-gray-900 mb-2 rounded-sm" />
                        <p className="text-xs text-center">Dark</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-md bg-primary cursor-pointer" />
                      <Input
                        type="text"
                        defaultValue="#0070f3"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Font</Label>
                    <Select defaultValue="inter">
                      <SelectTrigger>
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inter">Inter</SelectItem>
                        <SelectItem value="roboto">Roboto</SelectItem>
                        <SelectItem value="poppins">Poppins</SelectItem>
                        <SelectItem value="montserrat">Montserrat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>SEO Settings</Label>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full">
                          Configure SEO
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>SEO Settings</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="meta-title">Meta Title</Label>
                            <Input
                              id="meta-title"
                              defaultValue="My 3D Portfolio | 3D Artist"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="meta-description">
                              Meta Description
                            </Label>
                            <Input
                              id="meta-description"
                              defaultValue="Explore my 3D artwork, models, and creative projects. Professional 3D artist portfolio showcasing digital sculptures, animations, and game assets."
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="keywords">Keywords</Label>
                            <Input
                              id="keywords"
                              defaultValue="3D art, 3D models, portfolio, digital sculpture, 3D artist"
                            />
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="space-y-2">
                    <Label>Social Media</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full">
                          Configure Social Links
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="artstation">ArtStation</Label>
                            <Input
                              id="artstation"
                              placeholder="https://artstation.com/username"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="instagram">Instagram</Label>
                            <Input
                              id="instagram"
                              placeholder="https://instagram.com/username"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="behance">Behance</Label>
                            <Input
                              id="behance"
                              placeholder="https://behance.net/username"
                            />
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default WebsiteBuilder;
