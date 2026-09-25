import * as React from "react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type LoginCardProps = Omit<React.ComponentProps<"div">, "title"> & {
  /** Brand mark above the title, e.g. <img src="/brand/logo-icon.png" className="size-12" />. */
  logo?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  /** Rendered between the header and the form: an Alert for a failed sign-in. */
  notice?: React.ReactNode
  /** The form — stock Label + Input fields and one full-width primary Button. */
  children: React.ReactNode
}

/**
 * One-column sign-in page: muted ground, a single max-w-sm Card centred on both axes
 * (the shadcn login-02 frame without the image column). Inputs and buttons stay stock.
 */
function LoginCard({ logo, title, description, notice, children, className, ...props }: LoginCardProps) {
  return (
    <div
      data-slot="login-card"
      className={cn("flex min-h-svh w-full items-center justify-center bg-muted p-6 md:p-10", className)}
      {...props}
    >
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center text-center">
          {logo ? <div className="mb-2 flex justify-center">{logo}</div> : null}
          <CardTitle className="text-2xl">{title}</CardTitle>
          {description ? <CardDescription className="text-balance">{description}</CardDescription> : null}
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {notice}
          {children}
        </CardContent>
      </Card>
    </div>
  )
}

export { LoginCard }
