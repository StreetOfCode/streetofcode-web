export default async function handler(req, res) {
  if (req.query.secret !== process.env.NEXT_PUBLIC_REVALIDATE_TOKEN) {
    return res.status(401).json({message: 'Invalid token'})
  }

  try {
    // path is i.e clanky/preco-sa-stat-programatorom
    if (
      req.query.path.includes('clanky/') ||
      req.query.path.includes('podcast/')
    ) {
      // &revalidate=true is added to the path to inform getStatisProps that it should revalidate
      // ?revalidate=true is not used because it does not work with getStaticProps
      await res.revalidate(`/${req.query.path}&revalidate=true`)
    } else {
      await res.revalidate(`/${req.query.path}`)
    }
    return res.json({revalidated: true})
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}
