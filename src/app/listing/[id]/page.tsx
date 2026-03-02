import ListingDetail from '@/views/ListingDetail'

// Dynamic route: /listing/:id → /listing/[id]
export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ListingDetail id={id} />
}
