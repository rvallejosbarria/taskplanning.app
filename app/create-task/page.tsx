'use client'

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowLeftIcon, CalendarIcon } from "@radix-ui/react-icons"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

import Link from "next/link"

import { useForm, useFieldArray } from "react-hook-form"

import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useRouter } from "next/navigation"

type FormValues = {
  description: string;
  deadline: Date;
  status: string;
  importance: string;
  employees: {
    name: string;
  }[];
}

const CreateTask = () => {
  const router = useRouter()

  const form = useForm<FormValues>({
    defaultValues: {
      description: "",
      employees: [{ name: "" }]
    }
  })

  const { register } = form

  const { fields, append, remove } = useFieldArray({
    name: 'employees',
    control: form.control
  })

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await fetch('/api/tasks/new', {
        method: 'POST',
        body: JSON.stringify(values)
      })

      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <main className="py-6 px-12 mt-10 mx-auto w-1/5 rounded border">
        <div className="flex flex-row justify-between mb-6">
          <Link href="/" className="flex flex-row items-center gap-x-2 hover:underline">
            <ArrowLeftIcon />
            <span>Go back</span>
          </Link>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Brief description of the task" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Deadline</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="InProgress">InProgress</SelectItem>
                      <SelectItem value="OnHold">OnHold</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="importance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Importance</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an importance" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Employees</FormLabel>
              <div className="flex flex-col gap-6 mt-1.5">
                {fields.map((field, idx) => (
                  <div className="flex flex-row" key={field.id}>
                    <Input
                      placeholder="Assign an employee"
                      type="text"
                      {...register(`employees.${idx}.name` as const)}
                    />
                    {
                      idx > 0 && (
                        <Button type="button" onClick={() => remove(idx)}>Remove</Button>
                      )
                    }
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => append({ name: "" })}
                  disabled={fields.length === 3}
                >
                  Add employee
                </Button>
              </div>
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </main>
    </>
  )
}

export default CreateTask