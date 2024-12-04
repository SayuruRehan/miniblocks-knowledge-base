import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const docsDirectory = path.join(process.cwd(), 'content')

export interface DocItem {
  title: string
  path: string
  level: number
  children?: DocItem[]
}

export function getDocTree(): DocItem[] {
  const tree: DocItem[] = []
  
  function processDirectory(dirPath: string, parentPath: string = ''): DocItem[] {
    const items: DocItem[] = []
    const entries = fs.readdirSync(dirPath, { withFileTypes: true })
    
    entries.forEach(entry => {
      const fullPath = path.join(dirPath, entry.name)
      const relativePath = path.join(parentPath, entry.name)
      
      if (entry.isDirectory()) {
        // Parse directory name for level and title (e.g., "1 - Introduction")
        const match = entry.name.match(/^(\d+(?:\.\d+)*)\s*-\s*(.+)$/)
        if (match) {
          const [, levelStr, title] = match
          const level = levelStr.split('.').length
          const children = processDirectory(fullPath, relativePath)
          
          items.push({
            title,
            path: `/docs/${relativePath}`,
            level,
            children: children.length > 0 ? children : undefined
          })
        }
      } else if (entry.name.endsWith('.md')) {
        // Parse markdown files
        const content = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(content)
        const title = data.title || entry.name.replace('.md', '')
        const level = parentPath.split('/').length
        
        items.push({
          title,
          path: `/docs/${relativePath.replace('.md', '')}`,
          level
        })
      }
    })
    
    return items
  }
  
  if (fs.existsSync(docsDirectory)) {
    return processDirectory(docsDirectory)
  }
  
  return tree
}

export function getDocContent(slug: string[]): { content: string; frontmatter: any } {
  const fullPath = path.join(docsDirectory, ...slug) + '.md'
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  return {
    content,
    frontmatter: data
  }
}