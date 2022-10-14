import { Dispatch, SetStateAction } from "react";

export type Item = {
  name: string;
  quantity: number;
  unit: string;
  store: string;
};

export type InitialCategory = {
  supermarket: boolean;
  restaurant: boolean;
};
export interface FormValues {
  category: string;
  orderItem: Item[];
  name: string;
  phoneNumber: string;
  location: string;
}
export interface ActiveOrder {
  id: string;
  category: string;
  orderItem: Item[];
  name: string;
  createdAt: string;
  active: boolean;
  phoneNumber: string;
  location: string;
}

export type OrderProps1 = {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  initialCategory: { supermarket: boolean; restaurant: boolean };
};

export type OrderProps2 = {
  formData: FormValues;
  setStoreValue: Dispatch<SetStateAction<string | null>>;
  initialCategory: { supermarket: boolean; restaurant: boolean };
  next: (newData: any, final?: boolean) => void;
  prev: (newData: any) => void;
};

export type OrderProps3 = {
  formData: FormValues;
  storeValue: string | null;
  setStoreValue: Dispatch<SetStateAction<string | null>>;
  next: (newData: any, final?: boolean) => void;
  prev: (newData: any) => void;
};

export type OrderProps4 = {
  formData: FormValues;
  preComplete: (newData: any) => void;
  next: (newData: any, final?: boolean) => void;
  prev: (newData: any) => void;
};
