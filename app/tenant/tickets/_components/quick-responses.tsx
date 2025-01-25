"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
interface QuickResponsesProps {
  onSelect: (response: string) => void
}
const QUICK_RESPONSES = {
  acknowledgment: [
    "We've received your ticket and will look into it shortly.",
    "Your maintenance request has been logged and assigned."
  ],
  update: [
    "We're working on your request and will update you soon.",
    "A maintenance team member has been assigned to your ticket."
  ],
  resolution: [
    "Your maintenance request has been completed. Please confirm if everything is satisfactory.",
    "We've resolved the issue. Let us know if you need anything else."
  ]
} as const
export function QuickResponses({ onSelect }: QuickResponsesProps) {
  return (
    <Select onValueChange={onSelect} data-oid="dvd1-.-">
      <SelectTrigger className="w-[300px]" data-oid="k0-6r7o">
        <SelectValue
          placeholder="Select a quick response..."
          data-oid="pwtq8y5"
        />
      </SelectTrigger>
      <SelectContent data-oid="p6co694">
        <SelectGroup data-oid="3n:li5q">
          <SelectLabel data-oid="k2vodx.">Acknowledgment</SelectLabel>
          {QUICK_RESPONSES.acknowledgment.map((response, index) => (
            <SelectItem
              key={`ack-${index}`}
              value={response}
              data-oid="9xhzvjg"
            >
              {response}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup data-oid="w0tnlg2">
          <SelectLabel data-oid=":v3krvu">Update</SelectLabel>
          {QUICK_RESPONSES.update.map((response, index) => (
            <SelectItem
              key={`update-${index}`}
              value={response}
              data-oid="hbih17t"
            >
              {response}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup data-oid="db:9:mu">
          <SelectLabel data-oid="1ac2dk3">Resolution</SelectLabel>
          {QUICK_RESPONSES.resolution.map((response, index) => (
            <SelectItem
              key={`resolution-${index}`}
              value={response}
              data-oid="s8ony9l"
            >
              {response}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
