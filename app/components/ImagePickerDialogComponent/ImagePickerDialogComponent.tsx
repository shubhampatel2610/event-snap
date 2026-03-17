/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AppConstants } from "@/app/constants/AppConstants";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { ArrowLeft, Loader2, Search } from "lucide-react";
import InputButton from "../common/ButtonComponent/InputButton";
import { setShowImagePicker } from "@/app/store/eventSlice";
import { useState } from "react";
import InputComponent from "../common/InputComponent/InputComponent";
import Image from "next/image";

interface DialogProps {
    onImageSelect: (value: string) => void
}

const ImagePickerDialogComponent = (props: DialogProps) => {
    const { onImageSelect } = props;
    const dispatch = useAppDispatch();
    const showImagePicker = useAppSelector((state) => state.event.showImagePicker);
    const [query, setQuery] = useState("");
    const [imageList, setImageList] = useState([]);
    const [loading, setLoading] = useState(false);


    const onClose = () => {
        dispatch(setShowImagePicker(false));
        setQuery("");
        setImageList([]);
    }

    const onSearchImage = async (searchQuery: string) => {
        if (!searchQuery.trim()) return;

        console.log("search Query", searchQuery)
        setLoading(true);
        try {
            const response = await fetch(`https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=10&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`);

            const data = await response.json();

            setImageList(data.results || []);
        } catch (error) {
            console.error(AppConstants.FETCH_IMAGE_ERROR, error);
        } finally {
            setLoading(false);
        }
    }

    const handleSearchImage = (e: any) => {
        e.preventDefault();
        onSearchImage(query);
    }

    return (
        <Dialog open={showImagePicker} onOpenChange={onClose}>
            <DialogContent className={"flex flex-col overflow-hidden max-w-4xl! w-full max-h-[80vh] bg-[#020714]"}>
                <DialogHeader>
                    <DialogTitle className="flex gap-2.5 items-center text-2xl">
                        {AppConstants.IMG_PICKER_HEADER}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSearchImage} className="flex gap-2">
                    <InputComponent
                        value={query}
                        onChange={(e: any) => setQuery(e.target.value)}
                        placeholder={AppConstants.IMG_PICKER_PLACEHOLDER}
                        className="flex-1"
                    />
                    <InputButton
                        label=""
                        variant={"secondary"}
                        icon={loading ?
                            <Loader2 className="h-3 w-3 animate-spin" /> :
                            <Search className="h-3 w-3" />}
                        asChild
                        disabled={loading}
                        type="submit"
                        onClick={handleSearchImage}
                    />
                </form>
                <div className="overflow-y-auto flex-1 px-6">
                    {loading ?
                        <div className="flex items-center justify-center h-64">
                            <Loader2 className="h-10 w-10 animate-spin" />
                        </div> :
                        (!loading && imageList.length > 0) ?
                            <div className="columns-2 md:columns-3 gap-4 px-2">
                                {imageList.map((image: any) => (
                                    <div
                                        key={image.id}
                                        className="mb-4"
                                    >
                                        <button
                                            key={image.id}
                                            onClick={() => onImageSelect(image.urls.regular)}
                                            className="relative overflow-hidden rounded-lg border border-transparent hover:border-purple-600 transition-all"
                                        >
                                            <Image
                                                className="w-full h-auto object-cover"
                                                src={image.urls.small}
                                                width={400}
                                                height={300}
                                                alt={image.description || "search-image"}
                                                priority
                                            />
                                        </button>
                                    </div>
                                ))}
                            </div> :
                            <div className="w-full text-center text-muted-foreground py-10">
                                {AppConstants.IMG_PICKER_PLACEHOLDER}
                            </div>}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ImagePickerDialogComponent;