"use client";

import { PhotoIcon, PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Input,
  Switch,
  Skeleton,
  cn,
  addToast,
  Textarea,
  DateInput,
} from "@heroui/react";
import { fromAbsolute, toCalendarDate, today } from "@internationalized/date";
import { useMutation, useQuery } from "convex/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";

// const timeZone = getLocalTimeZone();
const timeZone = "America/New_York";

function GalleryCard({
  image,
  onUpdate,
  onRemove,
  onUpload,
}: {
  image: Doc<"gallery"> & { url: string };
  onUpdate: (args: any) => void;
  onRemove: (id: string) => void;
  onUpload: (id: string) => void;
}) {
  const [localCaption, setLocalCaption] = useState(image.caption || "");
  const [localDate, setLocalDate] = useState(
    image.date ? toCalendarDate(fromAbsolute(image.date, timeZone)) : null,
  );

  useEffect(() => {
    setLocalCaption(image.caption || "");
  }, [image.caption]);

  useEffect(() => {
    if (image.date) setLocalDate(toCalendarDate(fromAbsolute(image.date, timeZone)));
  }, [image.date]);

  const handleUpdate = () => {
    const date = localDate?.toDate(timeZone)?.getTime();
    if (localCaption !== image.caption || date !== image.date) {
      onUpdate({ id: image._id, caption: localCaption, date });
    }
  };

  return (
    <Card isBlurred className="bg-default/10 border-none shadow-sm transition-transform">
      <CardBody className="flex flex-col gap-4 p-4">
        <div className="group relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
          <Image
            src={image.url || ""}
            alt={image.caption || "Gallery Image"}
            className="h-full w-full object-cover transition-transform duration-500"
            removeWrapper
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Button
              variant="flat"
              className="bg-white/20 text-white"
              startContent={<PhotoIcon className="size-5" />}
              onPress={() => onUpload(image._id)}
            >
              Replace Image
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-default-400 text-xs font-semibold tracking-wider uppercase">
                Status
              </span>
              <div className="mt-1 flex items-center gap-2">
                <Switch
                  size="sm"
                  isSelected={image.active}
                  onValueChange={(val) => onUpdate({ id: image._id, active: val })}
                />
                <span className={cn("text-sm", image.active ? "text-success" : "text-default-400")}>
                  {image.active ? "Visible" : "Hidden"}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-default-400 text-xs font-semibold tracking-wider uppercase">
                Date
              </span>
              <DateInput
                size="sm"
                variant="underlined"
                className="w-32"
                value={localDate}
                onChange={setLocalDate}
                onBlur={handleUpdate}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-default-400 text-xs font-semibold tracking-wider uppercase">
              Caption
            </span>
            <div className="flex items-center gap-2">
              <Textarea
                variant="bordered"
                placeholder="Add a caption..."
                value={localCaption}
                onValueChange={setLocalCaption}
                onBlur={handleUpdate}
                className="flex-1"
              />
            </div>
          </div>

          <Button
            isIconOnly
            size="sm"
            variant="light"
            color="danger"
            onPress={() => onRemove(image._id)}
            title="Remove Item"
            className="self-end"
          >
            <TrashIcon className="size-5" />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

export default function AdminGalleryPage() {
  const images = useQuery(api.gallery.getAll);
  const addImage = useMutation(api.gallery.addImage);
  const updateImage = useMutation(api.gallery.updateImage);
  const removeImage = useMutation(api.gallery.removeImage);
  const generateUploadUrl = useMutation(api.gallery.generateUploadUrl);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingForId, setUploadingForId] = useState<Doc<"gallery">["_id"] | "new" | null>(null);

  const handleCreate = useCallback(() => {
    setUploadingForId("new");
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !uploadingForId) return;

    const uploadOne = async (file: File) => {
      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!result.ok) throw new Error("Upload failed");
      const { storageId } = await result.json();

      return storageId as Id<"_storage">;
    };

    try {
      if (uploadingForId === "new") {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const image = await uploadOne(file);
          await addImage({
            image,
            caption: "",
            active: false,
            date: Date.now(),
          });
        }
        addToast({ color: "success", title: "Images added to gallery!" });
      } else {
        // replace existing image, just take the first file
        const image = await uploadOne(files[0]);
        await updateImage({ id: uploadingForId, image });
        addToast({ color: "success", title: "Image updated!" });
      }
    } catch (error) {
      console.error(error);
      addToast({ color: "danger", title: "Upload failed!" });
    } finally {
      setUploadingForId(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  if (!images) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-32 w-full rounded-xl" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Card isBlurred className="texture border-none shadow-xl">
        <CardHeader className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-bold tracking-tight">Gallery</h2>
            <p className="text-default-500 text-small">Manage the image gallery across the site</p>
          </div>
          <Button
            color="primary"
            variant="shadow"
            onPress={handleCreate}
            startContent={<PlusIcon className="size-5" />}
            size="lg"
            className="w-full sm:w-auto"
          >
            Add Image
          </Button>
        </CardHeader>
      </Card>

      <Card isBlurred className="border-none shadow-lg">
        <CardBody className="p-4 sm:p-6">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {images.length === 0 && (
              <div className="text-default-400 col-span-full py-12 text-center">
                <PhotoIcon className="mx-auto size-12 opacity-20" />
                <p className="mt-2 text-xl">No images in the gallery yet.</p>
              </div>
            )}
            {images.map((image) => (
              <GalleryCard
                key={image._id}
                image={image}
                onUpdate={updateImage}
                onRemove={(id) => removeImage({ id: id as any })}
                onUpload={(id) => {
                  setUploadingForId(id as any);
                  fileInputRef.current?.click();
                }}
              />
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
