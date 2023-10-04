'use client'

import { FormEvent, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { updateUsername } from '@/actions/update-username'
import { CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Loader2 } from 'lucide-react'

export function UsernameForm() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { data: session, update } = useSession()
  const router = useRouter()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    if (!session) {
      setIsLoading(false)
      throw new Error('Unauthenticated')
    }

    if (session?.user.username) {
      router.push('/')
      setIsLoading(false)
      return
    }

    if (!inputRef.current?.value) {
      setIsLoading(false)
      return
    }

    const statusCode = await updateUsername({
      userId: session.user.id,
      username: inputRef.current.value,
    })

    if (statusCode === 400) {
      setError('Esse nome de usuário já está sendo utilizado.')
      setIsLoading(false)
    }

    if (statusCode === 204) {
      await update()
      router.refresh()
      router.push('/')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="flex w-full justify-between items-center gap-4">
            {/* Dia */}
            <div className="flex flex-col w-full gap-1.5">
              <Label htmlFor="username">Nome de usuário</Label>
              <div className="relative h-full w-full">
                <Input
                  ref={inputRef}
                  id="username"
                  name="username"
                  className="flex-1 pl-8 h-12 text-base -mt-[1px]"
                />
                <span className="text-muted-foreground absolute inset-0 top-1/2 -translate-y-1/2 ml-3 -mt-[1px] pointer-events-none">
                  @
                </span>
              </div>
              <span className="text-sm text-red-500 font-semibold">
                {error || ''}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-16 flex justify-end">
          <Button
            disabled={isLoading}
            type="submit"
            className="w-full rounded-full h-10 bg-foreground"
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              'Avançar'
            )}
          </Button>
        </CardFooter>
      </form>
    </>
  )
}
