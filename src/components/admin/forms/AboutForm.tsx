'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { updateAboutSection } from '@/app/actions'

interface AboutFormProps {
  initialData: any
}

export function AboutForm({ initialData }: AboutFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    introEn: initialData?.introEn || '',
    introFr: initialData?.introFr || '',
    descriptionEn: initialData?.descriptionEn || '',
    descriptionFr: initialData?.descriptionFr || '',
    yearsExperience: initialData?.yearsExperience || 0,
    projectsCompleted: initialData?.projectsCompleted || 0,
    clientsSatisfied: initialData?.clientsSatisfied || 0,
    image: initialData?.image || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await updateAboutSection(formData)
      
      if (result.success) {
        toast({
          title: 'Success',
          description: 'About section updated successfully',
        })
        router.refresh()
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error || 'Failed to update about section',
        })
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An unexpected error occurred',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="introEn">Introduction (English)</Label>
        <Input
          id="introEn"
          value={formData.introEn}
          onChange={(e) => setFormData({ ...formData, introEn: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="introFr">Introduction (French)</Label>
        <Input
          id="introFr"
          value={formData.introFr}
          onChange={(e) => setFormData({ ...formData, introFr: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="descriptionEn">Description (English)</Label>
        <Textarea
          id="descriptionEn"
          value={formData.descriptionEn}
          onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
          rows={8}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="descriptionFr">Description (French)</Label>
        <Textarea
          id="descriptionFr"
          value={formData.descriptionFr}
          onChange={(e) => setFormData({ ...formData, descriptionFr: e.target.value })}
          rows={8}
          required
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="yearsExperience">Years Experience</Label>
          <Input
            id="yearsExperience"
            type="number"
            value={formData.yearsExperience}
            onChange={(e) => setFormData({ ...formData, yearsExperience: parseInt(e.target.value) })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="projectsCompleted">Projects Completed</Label>
          <Input
            id="projectsCompleted"
            type="number"
            value={formData.projectsCompleted}
            onChange={(e) => setFormData({ ...formData, projectsCompleted: parseInt(e.target.value) })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="clientsSatisfied">Clients Satisfied</Label>
          <Input
            id="clientsSatisfied"
            type="number"
            value={formData.clientsSatisfied}
            onChange={(e) => setFormData({ ...formData, clientsSatisfied: parseInt(e.target.value) })}
            required
          />
        </div>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  )
}
