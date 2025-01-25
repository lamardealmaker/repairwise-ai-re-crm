"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { UserRoleWithDetails } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import {
  removeUserRoleAction,
  updateUserRoleAndInfoAction
} from "@/actions/db/user-roles-actions"
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  fullName: z.string().min(1, "Name is required"),
  role: z.enum(["ADMIN", "EMPLOYEE", "MAINTENANCE"] as const)
})
type FormData = z.infer<typeof formSchema>
interface StaffModalProps {
  staff: UserRoleWithDetails
  mode: "edit" | "delete"
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}
export function StaffModal({
  staff,
  mode,
  isOpen,
  onClose,
  onSuccess
}: StaffModalProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: staff.user?.email || "",
      fullName: staff.user?.fullName || "",
      role: (staff.role === "TENANT" ? "EMPLOYEE" : staff.role) as
        | "ADMIN"
        | "EMPLOYEE"
        | "MAINTENANCE"
    }
  })
  async function onSubmit(data: FormData) {
    try {
      const result = await updateUserRoleAndInfoAction(staff.id, data)
      if (!result.isSuccess) {
        toast.error(result.message)
        return
      }
      toast.success(result.message)
      onSuccess()
      onClose()
    } catch (error) {
      toast.error("Something went wrong")
    }
  }
  async function onDelete() {
    try {
      const result = await removeUserRoleAction(staff.id)
      if (!result.isSuccess) {
        toast.error(result.message)
        return
      }
      toast.success(result.message)
      onSuccess()
      onClose()
    } catch (error) {
      toast.error("Something went wrong")
    }
  }
  if (mode === "delete") {
    return (
      <Dialog open={isOpen} onOpenChange={onClose} data-oid="1x52dlj">
        <DialogContent data-oid="k1c.7l2">
          <DialogHeader data-oid="op:lto7">
            <DialogTitle data-oid="nup101g">Delete Staff Member</DialogTitle>
            <DialogDescription data-oid=".zv2c-_">
              Are you sure you want to remove this staff member from the
              organization? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter data-oid="ytxzwzm">
            <Button variant="outline" onClick={onClose} data-oid="64..jkv">
              Cancel
            </Button>
            <Button variant="destructive" onClick={onDelete} data-oid="6mjsc2x">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose} data-oid="spasv1_">
      <DialogContent data-oid="qmek-ff">
        <DialogHeader data-oid="n055sth">
          <DialogTitle data-oid="6y2gbl0">Edit Staff Member</DialogTitle>
          <DialogDescription data-oid="mttvf98">
            Update the staff member's information and role.
          </DialogDescription>
        </DialogHeader>
        <Form {...form} data-oid="qi6pe0p">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            data-oid="l_njm6d"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem data-oid="-lp-jo5">
                  <FormLabel data-oid="9it0sfz">Email</FormLabel>
                  <FormControl data-oid="1-xp.cx">
                    <Input {...field} type="email" data-oid="6h39x_3" />
                  </FormControl>
                  <FormMessage data-oid="-9hxuj-" />
                </FormItem>
              )}
              data-oid="f-x1jrb"
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem data-oid="_9qpwdp">
                  <FormLabel data-oid="dub0s-3">Name</FormLabel>
                  <FormControl data-oid="pmef30d">
                    <Input {...field} data-oid="xm60xjx" />
                  </FormControl>
                  <FormMessage data-oid="64k5342" />
                </FormItem>
              )}
              data-oid="va6-0e1"
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem data-oid="b90_87z">
                  <FormLabel data-oid="_a95p4e">Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    data-oid="fksqn:e"
                  >
                    <FormControl data-oid="8s.2n2_">
                      <SelectTrigger data-oid="qtgccfu">
                        <SelectValue
                          placeholder="Select a role"
                          data-oid="nlqspfa"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent data-oid="m_ibud0">
                      <SelectItem value="ADMIN" data-oid="23.zaus">
                        Admin
                      </SelectItem>
                      <SelectItem value="EMPLOYEE" data-oid="-p-cnca">
                        Employee
                      </SelectItem>
                      <SelectItem value="MAINTENANCE" data-oid="ekscb-5">
                        Maintenance
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage data-oid="aj8zwpx" />
                </FormItem>
              )}
              data-oid="203xsu0"
            />
            <DialogFooter data-oid="x7bmn48">
              <Button type="submit" data-oid="xkh:oft">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
