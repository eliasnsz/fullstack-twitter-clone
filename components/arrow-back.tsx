import { ArrowLeft } from 'lucide-react'

export function ArrowBack() {
  return (
    <button className="p-2 hover:bg-muted text-foreground transition-colors rounded-full">
      <ArrowLeft className="h-5 w-5" />
    </button>
  )
}
