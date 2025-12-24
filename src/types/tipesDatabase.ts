export interface DatabaseItem {
  ID: number
  image_path: string
  embedding: string // ainda não inserido no banco
  source_code: string
  description: string
  types: string // ainda não inserido no banco [mvv, quem somos, footer]
  site_link: string // ainda não inserido no banco
}