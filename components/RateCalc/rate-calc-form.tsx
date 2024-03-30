"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useForm } from "react-hook-form";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import * as z from 'zod';
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useEffect, useState } from "react";
import { Circle, MapPin, MapPinIcon, Square } from "lucide-react";
import { Separator } from "../ui/separator";


// Define the schema for product details
const rateCalcSchema = z.object({
    pickupPincode: z.string().min(6, "Please enter the valid pincode"),
    deliveryPincode: z.string().min(6, "Please enter the valid pincode"),
    weight: z.string(),
    orderBoxLength: z.string().min(1, "Please enter the length"),
    orderBoxWidth: z.string().min(1, "Please enter the width"),
    orderBoxHeight: z.string().min(1, "Please enter the height"),
    orderWeight: z.string().min(1, "Please enter the weight"),
    payment_mode: z.enum(["COD", "Prepaid"], {
        required_error: "Payment mode is required"
    }),
    collectableAmount: z.string()

});


export const RateCalcForm = () => {
    // const { handleCreateOrder } = useSellerProvider();

    const form = useForm({
        resolver: zodResolver(rateCalcSchema),
        defaultValues: {
            pickupPincode: "",
            deliveryPincode: "",
            weight: "",
            payment_mode: "" as "COD" | "Prepaid",
            orderBoxLength: "",
            orderBoxWidth: "",
            orderBoxHeight: "",
            orderWeight: "",
            collectableAmount: ""
        }
    });

    const { setValue } = form
    const isLoading = form.formState.isSubmitting;
    const [collectableFeild, setCollectableFeild] = useState(false);

    const isCOD = form.watch('payment_mode') === "COD";


    useEffect(() => {
        if (isCOD) {
            setCollectableFeild(true);
        } else {
            setCollectableFeild(false);
        }
    }, [isCOD]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let numericValue = e.target.value.replace(/[^0-9.]/g, '');
        const parts = numericValue.split('.');
        if (parts.length > 2) {
            numericValue = parts[0] + '.' + parts.slice(1).join('');
        }
        const field = e.target.name as keyof typeof rateCalcSchema; // Explicitly define the type of 'field'
        console.log(field)
        //@ts-ignore
        form.setValue(field, numericValue);
    };

    const isError = (name: string) => {
        //@ts-ignore
        return form.formState.isSubmitted && form.formState.errors[name] ? true : false;
    };


    const onSubmit = async (values: z.infer<typeof rateCalcSchema>) => {
        form.reset();

    }
    return (
        <>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-4 gap-2">
                        <Card className='col-span-3 space-y-3'>
                            <CardHeader>
                                <CardTitle>Shipping Rate Calculator</CardTitle>
                                <CardDescription>Order Details</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-10">
                                    <FormField
                                        control={form.control}
                                        name="pickupPincode"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel
                                                    className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                                                >
                                                    Pickup Pincode
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="flex gap-3 items-center">
                                                        <Input
                                                            disabled={isLoading}
                                                            className={cn("w-full bg-zinc-200/50 dark:bg-zinc-700 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0",
                                                                isError(field.name) ? "border-red-500 dark:border-red-500" : "border-0 dark:border-0"
                                                            )}
                                                            placeholder="Enter pickup pincode"
                                                            {...field}
                                                            onChange={handleChange}
                                                        />
                                                    </div>

                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="deliveryPincode"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel
                                                    className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                                                >
                                                    Delivery Pincode
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="flex gap-3 items-center">
                                                        <Input
                                                            disabled={isLoading}
                                                            className={cn("w-full bg-zinc-200/50 dark:bg-zinc-700 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0",
                                                                isError(field.name) ? "border-red-500 dark:border-red-500" : "border-0 dark:border-0"
                                                            )}
                                                            placeholder="Enter delivery pincode"
                                                            {...field}
                                                            onChange={handleChange}
                                                        />
                                                    </div>

                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>

                                <div className="grid grid-cols-3 gap-10">
                                    <div>
                                        <h4>Weight</h4>
                                        <FormField
                                            control={form.control}
                                            name="orderWeight"
                                            render={({ field }) => (
                                                <FormItem className="w-full">

                                                    <FormControl>
                                                        <div className="flex gap-3 items-center">
                                                            <Input
                                                                disabled={isLoading}
                                                                className={cn("w-full bg-zinc-200/50 dark:bg-zinc-700 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0",
                                                                    isError(field.name) ? "border-red-500 dark:border-red-500" : "border-0 dark:border-0"
                                                                )}
                                                                placeholder="Enter weight"
                                                                {...field}
                                                                onChange={handleChange}
                                                            />
                                                            <Button type='button' variant={"secondary"}>kg</Button>
                                                        </div>

                                                    </FormControl>
                                                    <FormDescription>Package weight should be 0.5kg.</FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <h4>Dimension</h4>
                                        <div className="flex gap-3">
                                            <FormField
                                                control={form.control}
                                                name="orderBoxLength"
                                                render={({ field }) => (
                                                    <FormItem className='w-full'>
                                                        <div className="flex flex-col space-y-4">
                                                            <div className="flex flex-row justify-between items-center">
                                                                <Input
                                                                    disabled={isLoading}
                                                                    className={cn("w-full bg-zinc-200/50  text-center dark:bg-zinc-700 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0",
                                                                        isError(field.name) ? "border-red-500 dark:border-red-500" : "border-0 dark:border-0"
                                                                    )}
                                                                    placeholder="L"
                                                                    {...field}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="orderBoxWidth"
                                                render={({ field }) => (
                                                    <FormItem className='w-full'>
                                                        <div className="flex flex-col space-y-4">
                                                            <div className="flex flex-row justify-between items-center">
                                                                <Input
                                                                    disabled={isLoading}
                                                                    className={cn("w-full bg-zinc-200/50 text-center dark:bg-zinc-700 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0",
                                                                        isError(field.name) ? "border-red-500 dark:border-red-500" : "border-0 dark:border-0"
                                                                    )}
                                                                    placeholder="B"
                                                                    {...field}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="orderBoxHeight"
                                                render={({ field }) => (
                                                    <FormItem className='w-full'>
                                                        <div className="flex flex-col space-y-4">
                                                            <div className="flex flex-row justify-between items-center">
                                                                <Input
                                                                    disabled={isLoading}
                                                                    className={cn("w-full bg-zinc-200/50 text-center dark:bg-zinc-700 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0",
                                                                        isError(field.name) ? "border-red-500 dark:border-red-500" : "border-0 dark:border-0"
                                                                    )}
                                                                    placeholder="H"
                                                                    {...field}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>
                                                        </div>

                                                    </FormItem>
                                                )}
                                            />
                                            <Button type='button' variant={"secondary"}>cm</Button>
                                        </div>
                                    </div>

                                </div>

                                <div className="grid grid-cols-2 gap-10">
                                    <FormField
                                        control={form.control}
                                        name="payment_mode"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel
                                                    className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                                                >
                                                    Payment Mode
                                                </FormLabel>
                                                <Select
                                                    disabled={isLoading}
                                                    onValueChange={field.onChange}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger
                                                            className="bg-zinc-300/50 dark:bg-zinc-700 dark:text-white border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none"
                                                        >
                                                            <SelectValue placeholder="Select a payment mode" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value={"COD"}>Cash on Delivery</SelectItem>
                                                        <SelectItem value={"Prepaid"}>Prepaid</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {
                                        collectableFeild && (
                                            <FormField
                                                control={form.control}
                                                name="collectableAmount"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel
                                                            className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                                                        >
                                                            Collectable Amount
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                disabled={isLoading}
                                                                className="bg-zinc-200/50 border-0 dark:bg-zinc-700 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                                placeholder="Enter the amount to collect"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )
                                    }

                                </div>


                            </CardContent>
                            <CardFooter className='flex-row-reverse'>
                                <Button type='submit' variant={'themeButton'} >Calculate</Button>
                                <Button variant={'secondary'} type='button'>Reset</Button>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className='flex items-center'><MapPin className='mr-3' size={20} />Pickup Address</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid">
                                    <div className="space-y-3 items-center flex flex-col ">
                                        <div className="space-y-3 w-52">
                                            <div className="flex items-center">
                                                <MapPin strokeWidth={2.4} className="" size={28} /><span className="text-lg">Pickup Location</span>
                                            </div>
                                            <div className="border-red-400 border px-3 py-1 rounded-md w-full text-center">pincode/state</div>
                                        </div>
                                        <Separator orientation="vertical" className="w-[2px]" />
                                        <div className="space-y-3 w-52">
                                            <div className="flex items-center">
                                                <MapPin strokeWidth={2.4} className="" size={28} /><span className="text-lg">De Location</span>
                                            </div>
                                            <div className="border-red-400 border px-3 py-1 rounded-md w-full text-center">pincode/state</div>
                                        </div>
                                    </div>

                                    <div className="">
                                        {/* <FormField
                                            control={form.control}
                                            name="pickupAddress"
                                            render={({ field }) => (
                                                <FormItem className='w-full'>
                                                    <FormLabel
                                                        className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                                                    >
                                                        Select Facility
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            disabled={isLoading}
                                                            onValueChange={field.onChange}

                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select facility" />
                                                            </SelectTrigger>
                                                            <SelectContent className="max-h-72">

                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        /> */}

                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </form>
            </Form>

        </>
    )
}