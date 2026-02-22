
import React from "react";
import BookingTable from "@/components/admin/BookingTable";
import BookingSearchFilter from "@/components/admin/BookingSearchFilter";
import DeleteBookingDialog from "@/components/admin/DeleteBookingDialog";
import { useAdminBookings } from "@/hooks/useAdminBookings";

const AdminBookings: React.FC = () => {
  const {
    bookings,
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
  } = useAdminBookings();

  if (isLoading) return <div>Loading bookings...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Admin Bookings</h1>

      <BookingSearchFilter
        search={search}
        selectedStatus={selectedStatus}
        onSearchChange={setSearch}
        onStatusChange={setSelectedStatus}
      />

      <BookingTable bookings={bookings} onDeleteClick={handleOpen} />

      <DeleteBookingDialog
        open={open}
        onOpenChange={setOpen}
        onConfirm={confirmDelete}
        onCancel={handleClose}
      />
    </div>
  );
};

export default AdminBookings;
