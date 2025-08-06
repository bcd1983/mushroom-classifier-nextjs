'use client';

import { Icon } from '@iconify/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

interface MushroomClassification {
  species: {
    commonName: string;
    scientificName: string;
  };
  confidence: 'high' | 'medium' | 'low';
  edibility: 'edible' | 'poisonous' | 'unknown' | 'not_recommended';
  toxicity: {
    level: 'none' | 'mild' | 'moderate' | 'severe' | 'deadly' | 'unknown';
    symptoms?: string[];
  };
  identifyingFeatures: string[];
  warnings: string[];
  similarSpecies: Array<{
    name: string;
    edibility: 'edible' | 'poisonous' | 'unknown' | 'not_recommended';
    keyDifference: string;
  }>;
  habitat?: string;
  season?: string;
}

interface MushroomResultProps {
  classification: MushroomClassification;
}

const edibilityConfig = {
  edible: {
    icon: 'mdi:food-apple',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    label: 'Edible',
    description: 'Safe to eat when properly prepared'
  },
  poisonous: {
    icon: 'mdi:skull-crossbones',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    label: 'Poisonous',
    description: 'Toxic - do not consume'
  },
  unknown: {
    icon: 'mdi:help-circle',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    label: 'Unknown',
    description: 'Edibility not determined'
  },
  not_recommended: {
    icon: 'mdi:alert',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    label: 'Not Recommended',
    description: 'May have adverse effects'
  }
};

const confidenceConfig = {
  high: { icon: 'mdi:check-circle', color: 'text-green-600', label: 'High Confidence' },
  medium: { icon: 'mdi:information', color: 'text-yellow-600', label: 'Medium Confidence' },
  low: { icon: 'mdi:alert-circle', color: 'text-orange-600', label: 'Low Confidence' }
};

const toxicityConfig = {
  none: { color: 'text-green-600', label: 'Non-toxic' },
  mild: { color: 'text-yellow-600', label: 'Mildly Toxic' },
  moderate: { color: 'text-orange-600', label: 'Moderately Toxic' },
  severe: { color: 'text-red-600', label: 'Severely Toxic' },
  deadly: { color: 'text-red-800', label: 'Deadly' },
  unknown: { color: 'text-gray-600', label: 'Unknown Toxicity' }
};

export function MushroomResult({ classification }: MushroomResultProps) {
  const edibility = edibilityConfig[classification.edibility];
  const confidence = confidenceConfig[classification.confidence];
  const toxicity = toxicityConfig[classification.toxicity.level];

  return (
    <div className="space-y-6">
      {/* Main Identification Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{classification.species.commonName}</CardTitle>
              <CardDescription className="italic text-base mt-1">
                {classification.species.scientificName}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Icon icon={confidence.icon} className={cn("w-5 h-5", confidence.color)} />
              <span className={confidence.color}>{confidence.label}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Edibility Status */}
          <div className={cn(
            "p-4 rounded-lg border-2 mb-6",
            edibility.bgColor,
            edibility.borderColor
          )}>
            <div className="flex items-center gap-3">
              <Icon icon={edibility.icon} className={cn("w-8 h-8", edibility.color)} />
              <div>
                <p className={cn("font-semibold text-lg", edibility.color)}>
                  {edibility.label}
                </p>
                <p className="text-sm text-muted-foreground">{edibility.description}</p>
              </div>
            </div>
          </div>

          {/* Toxicity Information */}
          {classification.toxicity.level !== 'none' && (
            <Alert variant="destructive" className="mb-6">
              <Icon icon="mdi:alert" className="h-4 w-4" />
              <AlertTitle>Toxicity: {toxicity.label}</AlertTitle>
              {classification.toxicity.symptoms && classification.toxicity.symptoms.length > 0 && (
                <AlertDescription>
                  <p className="font-medium mb-2">Potential symptoms:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {classification.toxicity.symptoms.map((symptom, idx) => (
                      <li key={idx} className="text-sm">{symptom}</li>
                    ))}
                  </ul>
                </AlertDescription>
              )}
            </Alert>
          )}

          {/* Warnings */}
          {classification.warnings.length > 0 && (
            <Alert className="mb-6">
              <Icon icon="mdi:alert-circle" className="h-4 w-4" />
              <AlertTitle>Important Warnings</AlertTitle>
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  {classification.warnings.map((warning, idx) => (
                    <li key={idx} className="text-sm">{warning}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Identifying Features */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Icon icon="mdi:magnify" className="w-5 h-5" />
              Identifying Features
            </h3>
            <ul className="space-y-2">
              {classification.identifyingFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Icon icon="mdi:check" className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Habitat and Season */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {classification.habitat && (
              <div className="flex items-start gap-2">
                <Icon icon="mdi:tree" className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Habitat</p>
                  <p className="text-sm text-muted-foreground">{classification.habitat}</p>
                </div>
              </div>
            )}
            {classification.season && (
              <div className="flex items-start gap-2">
                <Icon icon="mdi:calendar" className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Season</p>
                  <p className="text-sm text-muted-foreground">{classification.season}</p>
                </div>
              </div>
            )}
          </div>

          {/* Similar Species */}
          {classification.similarSpecies.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Icon icon="mdi:compare" className="w-5 h-5" />
                Similar Species to Be Aware Of
              </h3>
              <div className="space-y-3">
                {classification.similarSpecies.map((species, idx) => (
                  <Card key={idx} className="p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{species.name}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {species.keyDifference}
                        </p>
                      </div>
                      <div className={cn(
                        "px-2 py-1 rounded text-xs font-medium",
                        edibilityConfig[species.edibility].bgColor,
                        edibilityConfig[species.edibility].color
                      )}>
                        {edibilityConfig[species.edibility].label}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}