'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Loader2, GripVertical, Edit3 } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';

// Types
export interface ImageData {
  id?: string;
  url: string;
  publicId: string;
  altText?: string;
}

interface ImageUploadProps {
  variant: 'single' | 'multiple';
  value?: ImageData | ImageData[];
  onChange: (value: ImageData | ImageData[] | undefined) => void;
  maxFileSize?: number;
  limit?: number;
  className?: string;
  disabled?: boolean;
}

interface UploadProgress {
  [key: string]: number;
}

// Sortable Image Item Component
function SortableImageItem({
  image,
  onDelete,
  onUpdateAlt,
  disabled,
}: {
  image: ImageData;
  onDelete: () => void;
  onUpdateAlt: (altText: string) => void;
  disabled?: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [altText, setAltText] = useState(image.altText || '');

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.publicId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSaveAlt = () => {
    onUpdateAlt(altText);
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative group rounded-lg border bg-card overflow-hidden',
        isDragging && 'opacity-50 z-50'
      )}
    >
      <div className="aspect-square relative">
        <Image
          src={image.url}
          alt={image.altText || 'Product image'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="absolute top-2 left-2 p-1 bg-black/50 rounded cursor-grab hover:bg-black/70 transition-colors"
        >
          <GripVertical className="h-4 w-4 text-white" />
        </div>

        {/* Delete Button */}
        <Button
          variant="destructive"
          size="sm"
          className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onDelete}
          disabled={disabled}
          type="button"
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Edit Alt Text Button */}
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="absolute bottom-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => setIsEditing(true)}
          disabled={disabled}
        >
          <Edit3 className="h-4 w-4" />
        </Button>
      </div>

      {/* Alt Text Editor */}
      {isEditing && (
        <div className="p-3 border-t bg-background">
          <Label htmlFor="alt-text" className="text-xs text-muted-foreground">
            Alt Text
          </Label>
          <div className="flex gap-2 mt-1">
            <Input
              id="alt-text"
              value={altText}
              onChange={e => setAltText(e.target.value)}
              placeholder="Describe this image"
              className="text-xs"
            />
            <Button type="button" size="sm" onClick={handleSaveAlt}>
              Save
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                setAltText(image.altText || '');
                setIsEditing(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Alt Text Display */}
      {!isEditing && image.altText && (
        <div className="p-2 border-t bg-muted/50">
          <p className="text-xs text-muted-foreground truncate">
            {image.altText}
          </p>
        </div>
      )}
    </div>
  );
}

// Main ImageUpload Component
const ImageUpload = React.forwardRef<HTMLDivElement, ImageUploadProps>(
  (
    {
      variant,
      value,
      onChange,
      maxFileSize = 5 * 1024 * 1024, // 5MB
      limit = 10,
      className,
      disabled = false,
    },
    ref
  ) => {
    const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});
    const [isUploading, setIsUploading] = useState(false);

    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );

    const currentImages = useMemo(() => {
      return variant === 'single'
        ? value
          ? [value as ImageData]
          : []
        : (value as ImageData[]) || [];
    }, [variant, value]);

    const canUploadMore =
      variant === 'single'
        ? currentImages.length === 0
        : currentImages.length < limit;

    const onDrop = useCallback(
      async (acceptedFiles: File[]) => {
        if (disabled) return;

        const filesToUpload =
          variant === 'single'
            ? acceptedFiles.slice(0, 1)
            : acceptedFiles.slice(0, limit - currentImages.length);

        setIsUploading(true);

        try {
          const uploadPromises = filesToUpload.map(async file => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('folder', 'products');

            const fileId = `${file.name}-${Date.now()}`;

            const response = await axios.post('/api/upload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              onUploadProgress: progressEvent => {
                const progress = progressEvent.total
                  ? Math.round(
                      (progressEvent.loaded * 100) / progressEvent.total
                    )
                  : 0;

                setUploadProgress(prev => ({
                  ...prev,
                  [fileId]: progress,
                }));
              },
            });

            // Clear progress for this file
            setUploadProgress(prev => {
              const newProgress = { ...prev };
              delete newProgress[fileId];
              return newProgress;
            });

            return response.data.data;
          });

          const uploadedImages = await Promise.all(uploadPromises);

          if (variant === 'single') {
            onChange(uploadedImages[0]);
          } else {
            const newImages = [...currentImages, ...uploadedImages];
            onChange(newImages);
          }

          toast.success(
            `${uploadedImages.length} image${
              uploadedImages.length !== 1 ? 's' : ''
            } uploaded successfully`
          );
        } catch (error) {
          console.error('Upload error:', error);
          toast.error('Upload failed. Please try again.');
        } finally {
          setIsUploading(false);
        }
      },
      [variant, currentImages, limit, onChange, disabled]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: {
        'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif'],
      },
      maxSize: maxFileSize,
      disabled: disabled || !canUploadMore,
      multiple: variant === 'multiple',
    });

    const handleDelete = async (imageToDelete: ImageData) => {
      if (disabled) return;

      try {
        // Delete from Cloudinary
        await axios.delete(`/api/upload?publicId=${imageToDelete.publicId}`);

        if (variant === 'single') {
          onChange(undefined);
        } else {
          const newImages = currentImages.filter(
            img => img.publicId !== imageToDelete.publicId
          );
          onChange(newImages.length > 0 ? newImages : []);
        }

        toast.success('Image deleted successfully');
      } catch (error) {
        console.error('Delete error:', error);
        toast.error('Failed to delete image');
      }
    };

    const handleUpdateAlt = (publicId: string, altText: string) => {
      if (variant === 'single') {
        const image = value as ImageData;
        if (image && image.publicId === publicId) {
          onChange({ ...image, altText });
        }
      } else {
        const images = (value as ImageData[]) || [];
        const updatedImages = images.map(img =>
          img.publicId === publicId ? { ...img, altText } : img
        );
        onChange(updatedImages);
      }
    };

    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;

      if (active.id !== over?.id && variant === 'multiple') {
        const images = (value as ImageData[]) || [];
        const oldIndex = images.findIndex(img => img.publicId === active.id);
        const newIndex = images.findIndex(img => img.publicId === over?.id);

        if (oldIndex !== -1 && newIndex !== -1) {
          const reorderedImages = arrayMove(images, oldIndex, newIndex);
          onChange(reorderedImages);
        }
      }
    };

    return (
      <div
        ref={ref}
        data-slot="image-upload"
        className={cn('space-y-4', className)}
      >
        {/* Upload Area */}
        {canUploadMore && (
          <div
            {...getRootProps()}
            className={cn(
              'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
              isDragActive
                ? 'border-primary bg-primary/5'
                : 'border-muted-foreground/25 hover:border-muted-foreground/50',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <input {...getInputProps()} />

            {isUploading ? (
              <div className="space-y-2">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Uploading...</p>

                {/* Progress Bars */}
                {Object.entries(uploadProgress).map(([fileId, progress]) => (
                  <div key={fileId} className="space-y-1">
                    <Progress value={progress} className="w-full" />
                    <p className="text-xs text-muted-foreground">{progress}%</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">
                    {isDragActive
                      ? 'Drop the files here'
                      : 'Drag & drop files here, or click to select'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {variant === 'single'
                      ? 'Upload 1 image'
                      : `Upload up to ${limit} images`}{' '}
                    (Max {Math.round(maxFileSize / 1024 / 1024)}MB each)
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Image Grid */}
        {currentImages.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                {variant === 'single'
                  ? 'Image'
                  : `Images (${currentImages.length})`}
              </p>
              {variant === 'multiple' && currentImages.length > 1 && (
                <Badge variant="outline" className="text-xs">
                  Drag to reorder
                </Badge>
              )}
            </div>

            {variant === 'single' ? (
              <SortableImageItem
                image={currentImages[0]}
                onDelete={() => handleDelete(currentImages[0])}
                onUpdateAlt={altText =>
                  handleUpdateAlt(currentImages[0].publicId, altText)
                }
                disabled={disabled}
              />
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={currentImages.map(img => img.publicId)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {currentImages.map(image => (
                      <SortableImageItem
                        key={image.publicId}
                        image={image}
                        onDelete={() => handleDelete(image)}
                        onUpdateAlt={altText =>
                          handleUpdateAlt(image.publicId, altText)
                        }
                        disabled={disabled}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </div>
        )}

        {/* Upload More Button for Multiple */}
        {variant === 'multiple' &&
          currentImages.length > 0 &&
          canUploadMore && (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              {...getRootProps()}
              disabled={disabled || isUploading}
            >
              <input {...getInputProps()} />
              <Upload className="mr-2 h-4 w-4" />
              Upload More Images ({limit - currentImages.length} remaining)
            </Button>
          )}
      </div>
    );
  }
);

ImageUpload.displayName = 'ImageUpload';

export { ImageUpload };
