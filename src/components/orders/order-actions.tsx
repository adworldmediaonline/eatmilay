'use client';

import { useState, useTransition } from 'react';
import {
  Eye,
  Package,
  Truck,
  Mail,
  MoreHorizontal,
  FileText,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { SerializedOrder } from '@/types/order';
import {
  updateOrderStatus,
  sendOrderEmail,
  addOrderNotes,
  type UpdateOrderStatusData,
  type SendOrderEmailData,
  type AddOrderNotesData,
} from '@/app/actions/order';

interface OrderActionsProps {
  order: SerializedOrder;
}

export function OrderActions({ order }: OrderActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [showNotesDialog, setShowNotesDialog] = useState(false);

  // Form states
  const [selectedStatus, setSelectedStatus] = useState(order.status);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [selectedEmailType, setSelectedEmailType] = useState<
    'confirmation' | 'shipped' | 'delivered'
  >('confirmation');
  const [notes, setNotes] = useState('');

  const handleStatusUpdate = () => {
    if (selectedStatus === order.status && !trackingNumber) {
      toast.error('Please select a different status or add a tracking number');
      return;
    }

    startTransition(async () => {
      try {
        const data: UpdateOrderStatusData = {
          id: order.id,
          status: selectedStatus as UpdateOrderStatusData['status'],
          trackingNumber: trackingNumber || undefined,
        };

        const result = await updateOrderStatus(data);

        if (result.success) {
          toast.success(`${result.message} & email sent to customer`);
          setShowStatusDialog(false);
          setTrackingNumber('');
        } else {
          toast.error(result.error);
        }
      } catch (error) {
        toast.error('Failed to update order status');
        console.error('Status update error:', error);
      }
    });
  };

  const handleQuickStatusUpdate = (status: UpdateOrderStatusData['status']) => {
    startTransition(async () => {
      try {
        const result = await updateOrderStatus({
          id: order.id,
          status,
        });

        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.error);
        }
      } catch (error) {
        toast.error('Failed to update order status');
        console.error('Status update error:', error);
      }
    });
  };

  const handleSendEmail = () => {
    startTransition(async () => {
      try {
        const data: SendOrderEmailData = {
          id: order.id,
          type: selectedEmailType,
        };

        const result = await sendOrderEmail(data);

        if (result.success) {
          toast.success(result.message);
          setShowEmailDialog(false);
        } else {
          toast.error(result.error);
        }
      } catch (error) {
        toast.error('Failed to send email');
        console.error('Email send error:', error);
      }
    });
  };

  const handleAddNotes = () => {
    if (!notes.trim()) {
      toast.error('Please enter some notes');
      return;
    }

    startTransition(async () => {
      try {
        const data: AddOrderNotesData = {
          id: order.id,
          notes: notes.trim(),
        };

        const result = await addOrderNotes(data);

        if (result.success) {
          toast.success(result.message);
          setShowNotesDialog(false);
          setNotes('');
        } else {
          toast.error(result.error);
        }
      } catch (error) {
        toast.error('Failed to add notes');
        console.error('Notes add error:', error);
      }
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0" disabled={isPending}>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href={`/dashboard/admin/orders/${order.id}`}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setShowStatusDialog(true)}>
            <Package className="mr-2 h-4 w-4" />
            Update Status
          </DropdownMenuItem>

          {order.status === 'CONFIRMED' && (
            <DropdownMenuItem
              onClick={() => handleQuickStatusUpdate('SHIPPED')}
              disabled={isPending}
            >
              <Truck className="mr-2 h-4 w-4" />
              Mark as Shipped
            </DropdownMenuItem>
          )}

          <DropdownMenuItem onClick={() => setShowEmailDialog(true)}>
            <Mail className="mr-2 h-4 w-4" />
            Send Email
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setShowNotesDialog(true)}>
            <FileText className="mr-2 h-4 w-4" />
            Add Notes
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Status Update Dialog */}
      <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>
              Change the status of order #{order.orderNumber}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={selectedStatus}
                onValueChange={(value: string) =>
                  setSelectedStatus(value as typeof selectedStatus)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                  <SelectItem value="DELAYED">Delayed</SelectItem>
                  <SelectItem value="PROCESSING">Processing</SelectItem>
                  <SelectItem value="SHIPPED">Shipped</SelectItem>
                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  <SelectItem value="REFUNDED">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {selectedStatus === 'SHIPPED' && (
              <div className="space-y-2">
                <Label htmlFor="tracking">Tracking Number (Optional)</Label>
                <Input
                  id="tracking"
                  value={trackingNumber}
                  onChange={e => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowStatusDialog(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button onClick={handleStatusUpdate} disabled={isPending}>
              {isPending ? 'Updating...' : 'Update Status'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send Email Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Email</DialogTitle>
            <DialogDescription>
              Send an email notification for order #{order.orderNumber}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-type">Email Type</Label>
              <Select
                value={selectedEmailType}
                onValueChange={(value: string) =>
                  setSelectedEmailType(value as typeof selectedEmailType)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select email type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confirmation">
                    Order Confirmation
                  </SelectItem>
                  <SelectItem value="shipped">Order Shipped</SelectItem>
                  <SelectItem value="delivered">Order Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowEmailDialog(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button onClick={handleSendEmail} disabled={isPending}>
              {isPending ? 'Sending...' : 'Send Email'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Notes Dialog */}
      <Dialog open={showNotesDialog} onOpenChange={setShowNotesDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Notes</DialogTitle>
            <DialogDescription>
              Add internal notes for order #{order.orderNumber}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Enter your notes here..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNotesDialog(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button onClick={handleAddNotes} disabled={isPending}>
              {isPending ? 'Adding...' : 'Add Notes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
