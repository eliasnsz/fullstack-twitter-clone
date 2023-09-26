'use client'
import { useEffect, useRef, useState } from 'react'
import {
  Calendar,
  ChevronDown,
  Globe2,
  Image as ImageIcon,
  Smile,
} from 'lucide-react'
import TextArea from 'react-textarea-autosize'

import { Avatar, AvatarImage } from './ui/avatar'
import { Separator } from './ui/separator'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'
import { Button } from './ui/button'

export function NewPost() {
  const inputRef = useRef<null | HTMLTextAreaElement>(null)
  const [contentExclusionAlert, setContentExclusionAlert] = useState(false)
  const [isActive, setIsActive] = useState(false)
  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Escape' && inputRef.current) {
      if (inputRef.current.value.length > 0) {
        setContentExclusionAlert(true)
        return
      }
      cleanInputAndBlur()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
    // eslint-disable-next-line
  }, [])

  function cleanInputAndBlur() {
    if (inputRef.current) {
      inputRef.current.value = ''
    }
    setIsActive(false)
    if (contentExclusionAlert) {
      setContentExclusionAlert(false)
    }
  }

  return (
    <div className="p-3 border-b border-b-border">
      <AlertDialog open={contentExclusionAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Descartar postagem?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita e você perderá seu rascunho.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setContentExclusionAlert(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"
              onClick={cleanInputAndBlur}
            >
              Descartar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <form>
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/eliasnsz.png" />
          </Avatar>
          <div className="flex-1 space-y-4">
            {isActive && (
              <div className="w-fit text-secondary-foreground py-0.5 flex items-center gap-0.5 hover:bg-muted cursor-pointer text-sm font-semibold border px-3 border-border rounded-full">
                Público
                <ChevronDown className="h-4 w-4 mt-0.5" />
              </div>
            )}
            <TextArea
              ref={inputRef}
              onClick={() => setIsActive(true)}
              placeholder="O que está acontecendo?!"
              className="bg-background text-primary placeholder:text-muted-foreground w-full mt-1 text-xl resize-none border-none outline-none"
            />
            {isActive && (
              <div>
                <button
                  type="button"
                  className="flex text-foreground hover:bg-muted px-2 py-1 rounded-full transition-colors items-center gap-1 text-sm font-semibold"
                >
                  <Globe2 className="h-4 w-4 mr-1" />
                  Todos podem responder
                </button>
                <Separator className="my-4" />
              </div>
            )}
            <div className="flex justify-between items-center">
              <div className="text-primary flex gap-1.5">
                <ImageIcon className="h-8 w-8 p-1.5 hover:bg-muted rounded-full cursor-pointer transition-colors" />
                <Smile className="h-8 w-8 p-1.5 hover:bg-muted rounded-full cursor-pointer transition-colors" />
                <Calendar className="h-8 w-8 p-1.5 hover:bg-muted rounded-full cursor-pointer transition-colors" />
              </div>
              <Button className="rounded-full px-5" type="submit">
                Postar
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
