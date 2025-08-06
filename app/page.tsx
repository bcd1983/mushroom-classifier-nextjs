'use client';

import { useState } from 'react';
import { ImageUpload } from '@/components/image-upload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MushroomResult } from '@/components/mushroom-result';
import type { MushroomClassification } from '@/app/api/classify/route';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [classification, setClassification] = useState<MushroomClassification | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setClassification(null);
    setError(null);
  };

  const handleClassify = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await fetch('/api/classify', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to classify mushroom');
      }

      const data = await response.json();
      setClassification(data.classification);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Mushroom Classifier</h1>
          <p className="text-muted-foreground">
            Upload a photo of a mushroom to identify its species
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Mushroom Image</CardTitle>
              <CardDescription>
                Take a clear photo showing the cap, gills, and stem if possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImageUpload onImageSelect={handleImageSelect} />
              
              {selectedImage && (
                <div className="flex justify-center mt-6">
                  <Button
                    onClick={handleClassify}
                    disabled={isLoading}
                    size="lg"
                  >
                    {isLoading ? 'Analyzing...' : 'Classify Mushroom'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {classification && (
            <MushroomResult classification={classification} />
          )}
        </div>

        <Alert className="mt-12">
          <AlertTitle>Important Safety Notice</AlertTitle>
          <AlertDescription>
            This is an AI-powered tool for educational purposes only.
            Never consume wild mushrooms based solely on this or any app&apos;s identification.
            Always consult with local mycology experts before consuming any wild mushrooms.
          </AlertDescription>
        </Alert>
      </main>
    </div>
  );
}
