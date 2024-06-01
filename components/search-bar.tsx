"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Badge } from "./ui/badge";

interface SearchPropsBar {
  data: {
    label: string;
    type: "hub" | "order",
    data: {
      icon: React.ReactNode;
      name: string;
      id: string;
      subBadgeText: string;
      badgeInfo?: {
        variant: string;
        text: string;
      }
    }[] | undefined
  }[]
}

export default function SearchBar({
  data
}: SearchPropsBar) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    }

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down)
  }, []);

  const onClick = ({ id, type }: { id: string, type: "hub" | "order" }) => {
    setOpen(false);

    if (type === "order") {
      return router.push(`/track/${id}`)
    }

    if (type === "hub") {
      return router.push(`/settings/pickup-address/manage-pickup-addresses`)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition border"
      >
        <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        <p
          className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition"
        >
          Search
        </p>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Enter ..." />
        <CommandList>
          <CommandEmpty>
            No Results found
          </CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data?.length) return null;

            return (
              <CommandGroup key={label} heading={label}>
                {data?.map(({ id, icon, name, subBadgeText, badgeInfo }) => {
                  return (
                    <CommandItem className="space-x-3" key={id} onSelect={() => onClick({ id, type })}>
                      {icon}
                      <span>{name}</span>
                      <Badge variant={(badgeInfo?.variant || "secondary") as "default" | "secondary" | "destructive" | "outline" | "success" | "failure" | "warning" | null | undefined}>{badgeInfo?.text}</Badge>
                      {subBadgeText  && <Badge variant={'secondary'}>{subBadgeText}</Badge>}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            )
          })}
        </CommandList>
      </CommandDialog>
    </>
  )
}