
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Booking } from "@/data/mockData";
import { useBooking } from "@/context/BookingContext";

export const useAdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [open, setOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
  
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { getAllBookings } = useBooking();

  // Mocked API call
  const fetchBookings = async (): Promise<Booking[]> => {
    return getAllBookings();
  };

  const deleteBooking = async (bookingId: number): Promise<void> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        setBookings(bookings.filter((booking) => booking.id !== bookingId));
        resolve();
      }, 500);
    });
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: fetchBookings
  });

  const mutation = useMutation({
    mutationFn: (bookingId: number) => deleteBooking(bookingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast({
        title: "Booking deleted successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Failed to delete booking.",
        variant: "destructive",
      });
    },
  });

  const handleOpen = (bookingId: number) => {
    setOpen(true);
    setSelectedBookingId(bookingId);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBookingId(null);
  };

  const confirmDelete = () => {
    if (selectedBookingId !== null) {
      mutation.mutate(selectedBookingId);
      handleClose();
    }
  };

  // Set bookings when data is available
  if (data && bookings.length === 0) {
    setBookings(data);
  }

  const filteredBookings = bookings.filter((booking) => {
    const searchRegex = new RegExp(search, "i");
    const matchesSearch =
      searchRegex.test(String(booking.trainId)) ||
      searchRegex.test(String(booking.userId)) ||
      searchRegex.test(booking.seatNo);

    const matchesStatus = selectedStatus === "all" ? true : booking.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return {
    bookings: filteredBookings,
    isLoading,
    isError,
    error,
    search,
    setSearch,
    selectedStatus,
    setSelectedStatus,
    open,
    setOpen,
    handleOpen,
    handleClose,
    confirmDelete,
  };
};
