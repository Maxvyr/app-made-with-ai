import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Download, ImagePlus } from "lucide-react";

export default function Dalle3WebClient() {
  const [apiKey, setApiKey] = useState("");
  const [prompt, setPrompt] = useState("");
  const [resolution, setResolution] = useState("256x256");
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!apiKey || !prompt) {
      alert("Please enter both API key and prompt.");
      return;
    }

    try {
      setIsLoading(true);
      setImages([]);

      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: resolution,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate image.");
      }

      const data = await response.json();
      if (data && data.data) {
        const newImages = data.data.map((item: any) => item.url);
        setImages(newImages);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while generating the image.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold"
      >
        Simple DALL-E 3 Web Client
      </motion.h1>

      <Card className="max-w-xl w-full bg-white shadow-md p-4 rounded-2xl">
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">OpenAI API Key</label>
            <Input
              type="password"
              placeholder="Enter your OpenAI API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Prompt</label>
            <Input
              type="text"
              placeholder="Describe your image"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Resolution</label>
            <Select value={resolution} onValueChange={setResolution}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select resolution" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="256x256">256x256</SelectItem>
                <SelectItem value="512x512">512x512</SelectItem>
                <SelectItem value="1024x1024">1024x1024</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center">
            <Button onClick={handleGenerate} disabled={isLoading}>
              {isLoading ? "Generating..." : "Generate"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden shadow-md"
          >
            <img
              src={img}
              alt={`Generated #${index + 1}`}
              className="w-full h-full object-cover"
            />
            <Button
              variant="secondary"
              className="absolute top-2 right-2 rounded-full"
              onClick={() => {
                const link = document.createElement("a");
                link.href = img;
                link.download = `dalle3_image_${index + 1}.png`;
                link.click();
              }}
            >
              <Download className="w-4 h-4" />
            </Button>
          </motion.div>
        ))}
      </div>

      {images.length < 1 && !isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex flex-col items-center justify-center mt-4 text-gray-500"
        >
          <ImagePlus className="w-8 h-8 mb-2" />
          <p>No images yet. Generate some above!</p>
        </motion.div>
      )}
    </div>
  );
}
