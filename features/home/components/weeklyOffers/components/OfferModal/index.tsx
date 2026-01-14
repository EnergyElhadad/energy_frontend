"use client";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { ReactNode } from "react";
import { ImagesOfferSwipper } from "../ImagesOfferSwipper";
import { OfferContent } from "./components/OfferContent";

interface OfferModalProps {
  trigger?: ReactNode;
}

export const OfferModal = ({ trigger }: OfferModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-Background flex h-svh flex-col rounded-sm md:h-fit md:max-w-6xl md:flex-row">
        <div className="w-full flex-1 shrink-0 overflow-hidden">
          <ImagesOfferSwipper />
        </div>
        <div className="flex-1">
          <OfferContent />
        </div>
      </DialogContent>
    </Dialog>
  );
};
