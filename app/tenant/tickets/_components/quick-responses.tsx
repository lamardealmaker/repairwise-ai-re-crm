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
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-[300px]">
        <SelectValue placeholder="Select a quick response..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Acknowledgment</SelectLabel>
          {QUICK_RESPONSES.acknowledgment.map((response, index) => (
            <SelectItem key={`ack-${index}`} value={response}>
              {response}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Update</SelectLabel>
          {QUICK_RESPONSES.update.map((response, index) => (
            <SelectItem key={`update-${index}`} value={response}>
              {response}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Resolution</SelectLabel>
          {QUICK_RESPONSES.resolution.map((response, index) => (
            <SelectItem key={`resolution-${index}`} value={response}>
              {response}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
