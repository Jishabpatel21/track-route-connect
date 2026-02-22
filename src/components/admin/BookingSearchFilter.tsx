
import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BookingSearchFilterProps {
  search: string;
  selectedStatus: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const BookingSearchFilter: React.FC<BookingSearchFilterProps> = ({
  search,
  selectedStatus,
  onSearchChange,
  onStatusChange,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <Input
        type="text"
        placeholder="Search by Train ID, User ID, or Seat No."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-md"
      />

      <Select value={selectedStatus} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="confirmed">Confirmed</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
          <SelectItem value="waiting">Waiting</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default BookingSearchFilter;
