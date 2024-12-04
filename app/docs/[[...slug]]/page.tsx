import { MDXRemote } from 'next-mdx-remote/rsc'
import { getDocContent } from '@/lib/docs'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    slug?: string[]
  }
}

export default async function DocPage({ params }: PageProps) {
  const slug = params.slug || []
  
  try {
    const { content, frontmatter } = getDocContent(slug)
    
    return (
      <article className="prose prose-slate dark:prose-invert max-w-none">
        <h1>{frontmatter.title}</h1>
        <MDXRemote source={content} />
      </article>
    )
  } catch (error) {
    notFound()
  }
}