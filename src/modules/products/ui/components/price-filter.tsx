"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent } from "react";


interface Props {
    minPrice?: string | null;
    maxPrice?: string | null;
    onMinPriceChange: (value: string) => void;
    onMaxPriceChange: (value: string) => void;
}

export const formatAsCurrency = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, "");

    // Split integer and decimal parts
    const parts = numericValue.split(".");

    // Format: keep only 2 decimal places if available
    const formattedValue =
        parts[0] + (parts.length > 1 ? "." + parts[1]?.slice(0, 2) : "");

    if (!formattedValue) return "";
    const numberValue = parseFloat(formattedValue)
    if (isNaN(numberValue)) return "";

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,

    }).format(numberValue)

};

export const PriceFilter = ({
    maxPrice,
    minPrice,
    onMaxPriceChange,
    onMinPriceChange
}: Props) => {
    const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const numericValue = e.target.value.replace(/[^0-9.]/g, "")
        onMinPriceChange(numericValue)
    }

    const handleMuxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const numericValue = e.target.value.replace(/[^0-9.]/g, "")
        onMaxPriceChange(numericValue)
    }


    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
                <Label className="font-medium text-base">
                    Minimum price
                </Label>
                <Input
                    type="text"
                    placeholder="$0"
                    value={minPrice ? formatAsCurrency(minPrice) : ""}
                    onChange={handleMinPriceChange}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label className="font-medium text-base">
                    Muximum price
                </Label>
                <Input
                    type="text"
                    placeholder="&infin;"
                    value={maxPrice ? formatAsCurrency(maxPrice) : ""}
                    onChange={handleMuxPriceChange}
                />
            </div>
        </div>
    )
}
