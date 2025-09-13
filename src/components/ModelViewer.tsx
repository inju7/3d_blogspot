import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  RotateCw,
  ZoomIn,
  Move,
  Sun,
  Layers,
  Download,
  Share2,
  Maximize2,
} from "lucide-react";

interface ModelViewerProps {
  modelUrl?: string;
  initialRotation?: { x: number; y: number; z: number };
  initialZoom?: number;
  backgroundColor?: string;
  lightIntensity?: number;
  autoRotate?: boolean;
  showControls?: boolean;
  fileFormat?: string;
}

const ModelViewer = ({
  modelUrl = "https://example.com/default-model.glb",
  initialRotation = { x: 0, y: 0, z: 0 },
  initialZoom = 1,
  backgroundColor = "#f5f5f5",
  lightIntensity = 0.8,
  autoRotate = false,
  showControls = true,
  fileFormat = "glb",
}: ModelViewerProps) => {
  const [rotation, setRotation] = useState(initialRotation);
  const [zoom, setZoom] = useState(initialZoom);
  const [bgColor, setBgColor] = useState(backgroundColor);
  const [lightSettings, setLightSettings] = useState({
    intensity: lightIntensity,
  });
  const [isAutoRotating, setIsAutoRotating] = useState(autoRotate);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState("view");

  const viewerRef = useRef<HTMLDivElement>(null);

  // This would be replaced with actual 3D rendering logic using Three.js or similar
  useEffect(() => {
    // Placeholder for 3D model initialization
    console.log("Model loaded:", modelUrl);
    console.log("Settings:", {
      rotation,
      zoom,
      bgColor,
      lightSettings,
      isAutoRotating,
    });

    // Cleanup function
    return () => {
      console.log("Cleaning up 3D viewer");
    };
  }, [modelUrl, rotation, zoom, bgColor, lightSettings, isAutoRotating]);

  const handleRotationChange = (axis: "x" | "y" | "z", value: number) => {
    setRotation((prev) => ({ ...prev, [axis]: value }));
  };

  const handleZoomChange = (value: number[]) => {
    setZoom(value[0]);
  };

  const handleLightIntensityChange = (value: number[]) => {
    setLightSettings((prev) => ({ ...prev, intensity: value[0] }));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    // Actual fullscreen implementation would go here
  };

  const handleDownload = () => {
    // Placeholder for download functionality
    console.log("Downloading model");
  };

  const handleShare = () => {
    // Placeholder for share functionality
    console.log("Sharing model");
  };

  return (
    <div
      className={`bg-background ${isFullscreen ? "fixed inset-0 z-50" : "relative"}`}
    >
      <Card className="w-full h-full overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Viewer area */}
          <div
            ref={viewerRef}
            className="flex-1 relative"
            style={{ backgroundColor: bgColor }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              {/* Placeholder for actual 3D model */}
              <div className="text-center">
                <div className="w-64 h-64 mx-auto border-4 border-dashed border-muted-foreground/30 rounded-full flex items-center justify-center">
                  <p className="text-lg">3D Model Viewer</p>
                </div>
                <p className="mt-4">Model: {modelUrl.split("/").pop()}</p>
                <p>Format: {fileFormat.toUpperCase()}</p>
              </div>
            </div>

            {/* Overlay controls */}
            {showControls && (
              <div className="absolute top-2 right-2 flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleFullscreen}
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleDownload}>
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Controls panel */}
          <div className="border-t">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex justify-between items-center px-4 py-2">
                <TabsList>
                  <TabsTrigger value="view">View</TabsTrigger>
                  <TabsTrigger value="transform">Transform</TabsTrigger>
                  <TabsTrigger value="lighting">Lighting</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
              </div>

              <CardContent>
                <TabsContent value="view" className="space-y-4 py-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="file-format">File Format</Label>
                      <Select defaultValue={fileFormat}>
                        <SelectTrigger id="file-format">
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="glb">GLB</SelectItem>
                          <SelectItem value="gltf">GLTF</SelectItem>
                          <SelectItem value="obj">OBJ</SelectItem>
                          <SelectItem value="fbx">FBX</SelectItem>
                          <SelectItem value="stl">STL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="background-color">Background Color</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="background-color"
                          type="color"
                          value={bgColor}
                          onChange={(e) => setBgColor(e.target.value)}
                          className="w-12 h-9 p-1"
                        />
                        <Input
                          type="text"
                          value={bgColor}
                          onChange={(e) => setBgColor(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="auto-rotate"
                      checked={isAutoRotating}
                      onCheckedChange={setIsAutoRotating}
                    />
                    <Label htmlFor="auto-rotate">Auto-rotate model</Label>
                  </div>
                </TabsContent>

                <TabsContent value="transform" className="space-y-4 py-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="rotation-x">Rotation X</Label>
                        <span className="text-sm text-muted-foreground">
                          {rotation.x.toFixed(0)}°
                        </span>
                      </div>
                      <Slider
                        id="rotation-x"
                        min={0}
                        max={360}
                        step={1}
                        value={[rotation.x]}
                        onValueChange={(value) =>
                          handleRotationChange("x", value[0])
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="rotation-y">Rotation Y</Label>
                        <span className="text-sm text-muted-foreground">
                          {rotation.y.toFixed(0)}°
                        </span>
                      </div>
                      <Slider
                        id="rotation-y"
                        min={0}
                        max={360}
                        step={1}
                        value={[rotation.y]}
                        onValueChange={(value) =>
                          handleRotationChange("y", value[0])
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="rotation-z">Rotation Z</Label>
                        <span className="text-sm text-muted-foreground">
                          {rotation.z.toFixed(0)}°
                        </span>
                      </div>
                      <Slider
                        id="rotation-z"
                        min={0}
                        max={360}
                        step={1}
                        value={[rotation.z]}
                        onValueChange={(value) =>
                          handleRotationChange("z", value[0])
                        }
                      />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="zoom">Zoom</Label>
                        <span className="text-sm text-muted-foreground">
                          {zoom.toFixed(1)}x
                        </span>
                      </div>
                      <Slider
                        id="zoom"
                        min={0.1}
                        max={5}
                        step={0.1}
                        value={[zoom]}
                        onValueChange={handleZoomChange}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="lighting" className="space-y-4 py-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="light-intensity">Light Intensity</Label>
                        <span className="text-sm text-muted-foreground">
                          {lightSettings.intensity.toFixed(1)}
                        </span>
                      </div>
                      <Slider
                        id="light-intensity"
                        min={0}
                        max={2}
                        step={0.1}
                        value={[lightSettings.intensity]}
                        onValueChange={handleLightIntensityChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="light-type">Light Type</Label>
                      <Select defaultValue="ambient">
                        <SelectTrigger id="light-type">
                          <SelectValue placeholder="Select light type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ambient">Ambient</SelectItem>
                          <SelectItem value="directional">
                            Directional
                          </SelectItem>
                          <SelectItem value="point">Point</SelectItem>
                          <SelectItem value="spot">Spot</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4 py-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="shadow-quality">Shadow Quality</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger id="shadow-quality">
                          <SelectValue placeholder="Select quality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="off">Off</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="antialiasing">Anti-aliasing</Label>
                      <Select defaultValue="msaa_4x">
                        <SelectTrigger id="antialiasing">
                          <SelectValue placeholder="Select anti-aliasing" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="fxaa">FXAA</SelectItem>
                          <SelectItem value="msaa_2x">MSAA 2x</SelectItem>
                          <SelectItem value="msaa_4x">MSAA 4x</SelectItem>
                          <SelectItem value="msaa_8x">MSAA 8x</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="show-wireframe" />
                    <Label htmlFor="show-wireframe">Show Wireframe</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="show-grid" defaultChecked />
                    <Label htmlFor="show-grid">Show Grid</Label>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ModelViewer;
