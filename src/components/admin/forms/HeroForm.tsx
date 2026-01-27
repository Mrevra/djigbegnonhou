'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { updateHeroSection } from '@/app/actions'

interface HeroSectionData {
  firstName?: string
  lastName?: string
  nickname?: string
  titleEn?: string
  titleFr?: string
  taglineEn?: string
  taglineFr?: string
  ctaTextEn?: string
  ctaTextFr?: string
  ctaLink?: string
  profileImage?: string | null
  resumeUrl?: string | null
}

interface HeroFormProps {
  initialData?: HeroSectionData | null
}

export function HeroForm({ initialData }: HeroFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    nickname: initialData?.nickname || '',
    titleEn: initialData?.titleEn || '',
    titleFr: initialData?.titleFr || '',
    taglineEn: initialData?.taglineEn || '',
    taglineFr: initialData?.taglineFr || '',
    ctaTextEn: initialData?.ctaTextEn || '',
    ctaTextFr: initialData?.ctaTextFr || '',
    ctaLink: initialData?.ctaLink || '',
    profileImage: initialData?.profileImage || '',
    resumeUrl: initialData?.resumeUrl || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await updateHeroSection(formData)
      
      if (result.success) {
        toast({
          title: 'Success',
          description: 'Hero section updated successfully',
        })
        router.refresh()
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error || 'Failed to update hero section',
        })
      }
    } catch {
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
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nickname">Nickname/Brand</Label>
        <Input
          id="nickname"
          value={formData.nickname}
          onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="titleEn">Title (English)</Label>
        <Input
          id="titleEn"
          value={formData.titleEn}
          onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="titleFr">Title (French)</Label>
        <Input
          id="titleFr"
          value={formData.titleFr}
          onChange={(e) => setFormData({ ...formData, titleFr: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="taglineEn">Tagline (English)</Label>
        <Input
          id="taglineEn"
          value={formData.taglineEn}
          onChange={(e) => setFormData({ ...formData, taglineEn: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="taglineFr">Tagline (French)</Label>
        <Input
          id="taglineFr"
          value={formData.taglineFr}
          onChange={(e) => setFormData({ ...formData, taglineFr: e.target.value })}
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="ctaTextEn">CTA Text (English)</Label>
          <Input
            id="ctaTextEn"
            value={formData.ctaTextEn}
            onChange={(e) => setFormData({ ...formData, ctaTextEn: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ctaTextFr">CTA Text (French)</Label>
          <Input
            id="ctaTextFr"
            value={formData.ctaTextFr}
            onChange={(e) => setFormData({ ...formData, ctaTextFr: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ctaLink">CTA Link</Label>
        <Input
          id="ctaLink"
          value={formData.ctaLink}
          onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
          required
        />
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  )
}
